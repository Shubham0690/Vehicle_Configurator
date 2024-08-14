package com.example.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.entities.Component;
import com.example.entities.Manufacturer;
import com.example.services.ComponentServiceImpl;
import com.example.handlers.ResponseHandler;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/components")
public class ComponentController {
	
	@Autowired
    ComponentServiceImpl componentService;

   

    @GetMapping("/")
    public ResponseEntity<List<?>>  getAllComponents() {
        
        try {
			List<Component> components = componentService.getAllComponents();
			return new ResponseEntity<>(components,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
    @GetMapping("/{id}")
public ResponseEntity<Component>  getComponentById(@PathVariable long id) {
        
        try {
			Component component = componentService.getComponentById(id);
			return new ResponseEntity<>(component,HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }
}