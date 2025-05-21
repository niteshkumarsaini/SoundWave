package com.Backend.Music.Controllers;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.Backend.Music.Entities.Song;
import com.Backend.Music.Entities.User;
import com.Backend.Music.Repositories.SongRepository;
import com.Backend.Music.Services.SongService;
import com.Backend.Music.Services.UserService;
import com.Backend.Music.Util.YoutubeRequest;
@RestController
@RequestMapping("/youtube")
@CrossOrigin
public class YouTubeController {

    private static final Logger logger = LoggerFactory.getLogger(YouTubeController.class);

    private static final String BASE_SONG_DIR = "songs/";
    private static final String BASE_THUMBNAIL_DIR = "thumbnails/";
    private static final String YT_DLP_PATH = "C:\\Users\\ADMIN\\AppData\\Roaming\\Python\\Python312\\Scripts\\yt-dlp.exe";

    @Autowired
    private UserService userService;

    @Autowired
    private SongService songService;

    @Autowired
    private SongRepository songRepository;

    @PostMapping("/download")
    public ResponseEntity<String> downloadVideoAsMp3AndThumbnail(@RequestBody YoutubeRequest youtubeRequest) {
        try {
            // 1. Get user
            User user = userService.getUserByUsername(youtubeRequest.getUsername());
            UUID userId = user.getId();  // Assuming User has getId()

            // 2. Create user-specific directories
            File songDir = new File(BASE_SONG_DIR + userId);
            if (!songDir.exists()) {
                songDir.mkdirs();
                logger.info("Created song directory for user: " + userId);
            }

            File thumbnailDir = new File(BASE_THUMBNAIL_DIR + userId);
            if (!thumbnailDir.exists()) {
                thumbnailDir.mkdirs();
                logger.info("Created thumbnail directory for user: " + userId);
            }

            // 3. Build yt-dlp download process
            ProcessBuilder builder = new ProcessBuilder(
                    YT_DLP_PATH,
                    "-x", "--audio-format", "mp3",
                    "--write-thumbnail",
                    "--convert-thumbnails", "jpg",
                    "--output", "%(title)s.%(ext)s",
                    youtubeRequest.getUrl()
            );
            builder.directory(songDir); // Downloads everything into user's song directory
            Process process = builder.start();

            // 4. Log output
            BufferedReader stdOut = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stdErr = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            while ((line = stdOut.readLine()) != null) System.out.println("[yt-dlp] " + line);
            while ((line = stdErr.readLine()) != null) System.err.println("[yt-dlp ERROR] " + line);

            process.waitFor();

            // 5. Find latest MP3 and JPG files
            Optional<Path> mp3File = Files.list(songDir.toPath())
                    .filter(p -> p.toString().endsWith(".mp3"))
                    .max((p1, p2) -> Long.compare(p1.toFile().lastModified(), p2.toFile().lastModified()));

            Optional<Path> jpgFile = Files.list(songDir.toPath())
                    .filter(p -> p.toString().endsWith(".jpg"))
                    .max((p1, p2) -> Long.compare(p1.toFile().lastModified(), p2.toFile().lastModified()));

            if (mp3File.isPresent() && jpgFile.isPresent()) {
                // 6. Move thumbnail to thumbnail directory
                Path newThumbnailPath = Paths.get(thumbnailDir.getPath(), jpgFile.get().getFileName().toString());
                Files.move(jpgFile.get(), newThumbnailPath);

                // 7. Create and save Song
                Song song = new Song();
                song.setUser(user);
                song.setTitle(youtubeRequest.getTitle());
                song.setSongPath(mp3File.get().toString());
                song.setThumnailPath(newThumbnailPath.toString());
                song.setArtist(youtubeRequest.getArtist());

                songRepository.save(song);

                return ResponseEntity.ok("Downloaded and saved: " + mp3File.get().getFileName());
            } else {
                return ResponseEntity.status(500).body("MP3 or thumbnail not found after download.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Download error: " + e.getMessage());
        }
    }
}
