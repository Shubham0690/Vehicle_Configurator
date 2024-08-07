package com.example.Vehicle_Configurator.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailDetails {
	
	@Autowired
	JavaMailSender javamailsender;
	
	private String sendTo;	
	
	@Value("$(spring.mail.username)")
	private String SendEmailFrom;
	
	public EmailDetails(String sendTo) {
		super();
		this.sendTo = sendTo;
	}

	public EmailDetails() {
		super();
	}

	public String getSendTo() {
		return sendTo;
	}

	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}

	public String getSendEmailFrom() {
		return SendEmailFrom;
	}	
}


