package com.example.Vehicle_Configurator.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Vehicle_Configurator.entity.EmailDetails;
import com.example.Vehicle_Configurator.services.EmailService;


@RestController
@RequestMapping("/Email")
public class EmailController {

	@Autowired
	private EmailService emailService;
	String subject = "Login Successful :)";
	String body = "Dear user,\n\t You have successfully loged in the system. We are very excited to do buisness with you.\n\nThanks and Regards,";
	
	@PostMapping("/loginemail")
	public String sendMail(@RequestBody EmailDetails emailDetails)
	{
		return emailService.loginEmail(emailDetails.getSendTo(), subject, body);	
	}
	
	@PostMapping("/mailInvoice")
    public String sendInvoice(@RequestBody EmailDetails emailDetails)
    {	
    	String email= emailDetails.getSendTo();
    	return emailService.invoiceEmail(email, subject, body);
    }
}

