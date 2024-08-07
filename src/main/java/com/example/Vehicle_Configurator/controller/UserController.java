package com.example.Vehicle_Configurator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Vehicle_Configurator.entity.User;
import com.example.Vehicle_Configurator.services.UserManager;


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
	public String getUserByUsername(@PathVariable("username")String username) 
	{
		return userManager.getUSerByUsername(username);
	}

}

