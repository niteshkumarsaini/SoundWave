package com.Backend.Music.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Backend.Music.Entities.Playlist;
import com.Backend.Music.Entities.User;

@Repository
public interface PlaylistRepository extends CrudRepository<Playlist, Integer>{

	public Playlist findByUserAndName(User user,String name);
	public List<Playlist>findByUser(User user);
}
