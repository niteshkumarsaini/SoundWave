package com.Backend.Music.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Backend.Music.Entities.Song;
import com.Backend.Music.Entities.User;

@Repository
public interface SongRepository extends CrudRepository<Song, Integer>{
	
	public List<Song>findByUser(User user);
	

}
