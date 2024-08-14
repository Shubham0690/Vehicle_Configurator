package com.example.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repository.*;
import com.example.entities.*;


@Service
public class UserManagerImpl implements UserManager{
	@Autowired
	private UserRepository userRepository;
	

	public void createUser(User user) {
         userRepository.save(user);
    }
	
	public boolean validateUser(User user) {
		
        return userRepository.validateUser(user.getUsername(), user.getPassword());
    }

	@Override
	public User getUserByUsername(String username) {
		
		return userRepository.getUserByUsername(username);
	}

	

}

