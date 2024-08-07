package com.example.Vehicle_Configurator.services;

import com.example.Vehicle_Configurator.entity.User;

public interface UserManager  {
	
	 public void createUser(User user) ;
	 public boolean validateUser(User user);
	 public String getUSerByUsername(String username);

}
