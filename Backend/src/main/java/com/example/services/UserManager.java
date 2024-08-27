package com.example.services;

import com.example.entities.User;

public interface UserManager  {
	
	 public void createUser(User user) ;
	 public boolean validateUser(User user);
	 public User getUserByUsername(String username);

}
