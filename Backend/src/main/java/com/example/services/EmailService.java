package com.example.services;


import com.example.entities.EmailDetails;

public interface EmailService {
    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);
  
}

