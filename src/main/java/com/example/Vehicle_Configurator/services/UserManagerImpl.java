package com.example.Vehicle_Configurator.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Vehicle_Configurator.entity.User;
import com.example.Vehicle_Configurator.repository.UserRepository;


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
	public String getUSerByUsername(String username) {
		
		return userRepository.getUserByUsername(username);
	}

	

}

