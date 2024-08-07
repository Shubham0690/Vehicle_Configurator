package com.example.Vehicle_Configurator.services;

import org.springframework.beans.factory.annotation.Configurable;

@Configurable
public interface EmailService {
	
	public String loginEmail(String toEmailId, String subject, String body);
	public String invoiceEmail(String toEmailId, String subject, String body);
}

