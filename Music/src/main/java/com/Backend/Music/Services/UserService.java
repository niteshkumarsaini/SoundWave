package com.Backend.Music.Services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Backend.Music.Entities.User;
import com.Backend.Music.Repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User createUser(User user) {
//		user.setId(UUID.randomUUID());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		System.out.println(user.getName());
		System.out.println(user.getId());
		userRepository.save(user);

		return user;

	}

	public User getUserByUsername(String username) {
		User user = this.userRepository.findByUsername(username).get();
		return user;

	}

}
