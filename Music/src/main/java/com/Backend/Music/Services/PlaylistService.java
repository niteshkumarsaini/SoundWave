package com.Backend.Music.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Backend.Music.Entities.Playlist;
import com.Backend.Music.Entities.User;
import com.Backend.Music.Repositories.PlaylistRepository;
import com.Backend.Music.Repositories.UserRepository;

@Service
public class PlaylistService {

	@Autowired
	private PlaylistRepository playlistRepository;

	@Autowired
	private UserRepository userRepository;

	public Playlist createPlaylist(String name, String username) {
		
		//check if already exist
		User user=userRepository.findByUsername(username).get();
		Playlist existedPlaylist=playlistRepository.findByUserAndName(user, username);
		if(existedPlaylist!=null) {
			return null;
		}
		//fetch the user
		Playlist playlist = Playlist.builder().name(name).user(user)
				.build();
		playlistRepository.save(playlist);
		return playlist;

	}
	
	
	public List<Playlist>getPlaylists(String username){
		User user=userRepository.findByUsername(username).get();
		List<Playlist>playlists=playlistRepository.findByUser(user);
		return playlists;
		
		
	}
	
	
	

}
