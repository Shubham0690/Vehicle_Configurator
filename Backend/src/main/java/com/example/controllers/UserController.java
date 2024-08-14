package com.example.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.User;
import com.example.services.UserManager;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

	@Autowired
    private UserManager userManager;

	@PostMapping(value="/signup")
    public void registerCompany(@RequestBody User Reg) {
        userManager.createUser(Reg);
    }
	

	@PostMapping(value="/login")
    public boolean validateUser(@RequestBody User Reg) {
		return userManager.validateUser(Reg);
    }	 
	
	@GetMapping("/{username}")
	public User getUserByUsername(@PathVariable("username")String username) 
	{
		return userManager.getUserByUsername(username);
	}

}
