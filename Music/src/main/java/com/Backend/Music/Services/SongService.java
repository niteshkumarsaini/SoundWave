package com.Backend.Music.Services;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.Backend.Music.Entities.Song;
import com.Backend.Music.Entities.User;
import com.Backend.Music.Repositories.SongRepository;
import com.Backend.Music.Repositories.UserRepository;

import jakarta.annotation.PostConstruct;

@Service
public class SongService {

	@Value("${file.song}")
	String DIR;

	@Value("${thumbnail.dir}")
	String THUMBNAIL_DIR;

	@Autowired
	private SongRepository songRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	

	private static final Logger logger = LoggerFactory.getLogger(SongService.class);

	@PostConstruct
	public void init() {
		try {
			File directory = new File(DIR);
			if (directory.exists()) {
				logger.info("Songs Directory is already exist.");

			} else {
				directory.mkdir();
				logger.info("Songs Directory has been created successfully.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Song save(MultipartFile file, MultipartFile thumbnail, Song song,User user) {
		logger.info("save song method is running.");
		try {
			String originalFilename = file.getOriginalFilename();
			String contentType = file.getContentType();
			if (contentType.equals("song/mp3")) {

			}

			// Saving Thumbnail
			Path thumbnailPath = Paths.get(StringUtils.cleanPath(THUMBNAIL_DIR), user.getId().toString(),
					thumbnail.getOriginalFilename());
			File thumbnailDir = new File(THUMBNAIL_DIR + "/" + user.getId());
			if (thumbnailDir.exists()) {
				System.out.println("Thumbnail Directory already exist");
			} else {
				thumbnailDir.mkdirs();
				System.out.println("Thumbnail Directory created..");

			}

//	        song.setThumbnailType(thumbnail.getContentType());
			song.setThumnailPath(thumbnailPath.toString());
			InputStream thumbnailInputStream = thumbnail.getInputStream();
			Files.copy(thumbnailInputStream, thumbnailPath, StandardCopyOption.REPLACE_EXISTING);
			System.out.println("Thumbnail Uploaded Successfully..");

//	        song.setContentType(contentType);
			InputStream inputStream = file.getInputStream();
			System.out.println(originalFilename);
			String cleanFilename = StringUtils.cleanPath(originalFilename);
			String cleanDir = StringUtils.cleanPath(DIR);
			Path filePath = Path.of(cleanDir,user.getId().toString(), cleanFilename);
			song.setSongPath(filePath.toString());
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
			songRepository.save(song);
			// processVideo(video.getId());

			logger.info("File Saved Successfully..");

		} catch (Exception e) {
			e.printStackTrace();
		}
		return song;
	}
	
	
	public List<Song>getSongs(String username){
		//fetch the user
		User user=userRepository.findByUsername(username).get();
		if(user==null) {
			return null;
		}
		//fetch the song of the user
	
		List<Song>songs=songRepository.findByUser(user);
		System.out.println(songs);
		return songs;
		
		
	}
	
	public Song getById(int id) {
		try {
		Song song=songRepository.findById(id).get();
		return song;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	
	

}