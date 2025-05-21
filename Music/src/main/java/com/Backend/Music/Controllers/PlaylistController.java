package com.Backend.Music.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Backend.Music.Entities.Playlist;
import com.Backend.Music.Services.PlaylistService;
import com.Backend.Music.Util.Message;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/playlists")
public class PlaylistController {

	@Autowired
	private PlaylistService playlistService;

	@GetMapping("/fetch/user={user}")
	public ResponseEntity<?> getAllPlaylists(@PathVariable("user") String username) {
		System.out.println(username);
		List<Playlist> playlists = playlistService.getPlaylists(username);
		System.out.println(playlists);
		if(playlists.size()==0) {
			return ResponseEntity.status(HttpStatus.OK).body(Message.builder().message("No Playlist exist").type("Playlist").build());
		}
		return ResponseEntity.status(HttpStatus.OK).body(playlists);

	}
	
	@PostMapping("/save/user={user}")
	public ResponseEntity<?>createPlaylist(@PathVariable("user")String username, @RequestParam("playlist") String name){
		System.out.println(name);
		Playlist playlist=playlistService.createPlaylist(name, username);
		if(playlist==null) {
			return ResponseEntity.status(HttpStatus.FOUND).body(Message.builder().message("Playlist Already Exist").type("Playlist").build());
			
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(playlist);
		
	}
	

}
