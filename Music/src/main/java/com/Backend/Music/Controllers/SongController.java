package com.Backend.Music.Controllers;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import com.Backend.Music.Entities.Song;
import com.Backend.Music.Entities.User;
import com.Backend.Music.Services.SongService;
import com.Backend.Music.Services.UserService;
import com.Backend.Music.Util.Message;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/videos")
public class SongController {

	@Value("${thumbnail.dir")
	private String THUMBNAIL_DIR;

	@Autowired
	private SongService songService;

	@Autowired
	private UserService userService;

	private static final Logger logger = LoggerFactory.getLogger(SongController.class);

	@PostMapping(value = "/save", produces = "application/json")
	public ResponseEntity<?> save(@RequestParam("file") MultipartFile file, @RequestParam("title") String title,
			@RequestParam("artist") String artist, @RequestParam("thumbnail") MultipartFile thumbnail,
			@RequestParam("username") String username) {

		// fetching the user of the database

		User user = userService.getUserByUsername(username);
		Song song = new Song();
//	        song.setId(UUID.randomUUID().toString());
		song.setUser(user);
		song.setTitle(title);
		song.setArtist(artist);

		if (songService.save(file, thumbnail, song, user) != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(song);
		}
		;
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(Message.builder().message("Something went wrong").type("error").build());
	}

	// serve the song

	@GetMapping("/all-songs/{user}")
	public ResponseEntity<?> getAllSongs(@PathVariable("user") String username) {

		List<Song> songs = songService.getSongs(username);
		if (songs == null) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Message.builder().message("No User Exist"));
		}
		if (songs.size() == 0) {
			return ResponseEntity.status(HttpStatus.FOUND)
					.body(Message.builder().message("No Songs exist for this user"));
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(songs);

	}
	
	@GetMapping("/thumbnail/{songId}")
	public ResponseEntity<?>getThumbnail(@PathVariable("songId") String songId){
		try{
	        Song song=songService.getById(Integer.parseInt(songId));
	        if(song==null){
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

	        }
	        Path path=Paths.get(song.getThumnailPath());
	        Resource resource=new UrlResource(path.toUri());
	        return ResponseEntity.ok()
	                .contentType(MediaType.APPLICATION_OCTET_STREAM)
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +"thumbnail" + "\"")
	                .body(resource);
	    }
	    catch(Exception e){
	        e.printStackTrace();
	    }
	     return null;

	    }
	
	
	

}
