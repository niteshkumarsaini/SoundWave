package com.Backend.Music.Repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Backend.Music.Entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
	 Optional<User> findByUsername(String username);
//	 User findByUsername(String username);
	
	 
}
