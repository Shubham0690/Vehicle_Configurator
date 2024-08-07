//package com.example.Vehicle_Configurator.services;
//
//import java.io.File;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//
//import com.example.Vehicle_Configurator.entity.EmailDetails;
//
//import jakarta.mail.internet.MimeMessage;
//
//
////import com.vita.model.EmailDetails;
//
//@Service
//public class EmailServiceImpl implements EmailService {
//	
//	
//	@Autowired
//	JavaMailSender javamailsender;
//
////	@Value("$(spring.mail.username)")
////	private String fromEmailId;
//	List<EmailDetails> list;
//	
//	public EmailServiceImpl()
//	{
//		list=new ArrayList();
//		list.add(new EmailDetails("shubhamzargad103@gmail.com"));
//		list.add(new EmailDetails("ankleshbhute14jun@gmail.com"));
////		list.add(new EmailDetails("deveshkelkar5@gmail.com"));
//	}
//	
//	@Override
//	public String loginEmail(String toEmailId, String subject, String body) {
//		
//		EmailDetails obj=null;
//		SimpleMailMessage smm = new SimpleMailMessage();
//		
//		for(EmailDetails temp:list)
//		{
//			if(toEmailId.equals(temp.getSendTo()))
//			{
//				obj = temp;
//			}
//		}
//		smm.setFrom(obj.getSendEmailFrom());
//		smm.setTo(obj.getSendTo());
//		smm.setSubject(subject);
//		smm.setText(body);
//		
//		javamailsender.send(smm);
//
//		return "Email send Successfully";
//	}
//
//	@Override
//	public String invoiceEmail(String toEmailId, String subject, String body) {
//		
//		MimeMessage mimeMessage = javamailsender.createMimeMessage();
//		MimeMessageHelper helper;
//		try {
//			helper = new MimeMessageHelper(mimeMessage, true);
//			helper.setTo(toEmailId);
//			helper.setSubject(subject);
//			helper.setText(body);
//			File attachment = new File("C:/Users/SHUBHAM ZARGAD/Desktop/abc.pdf");
//			if (attachment != null && attachment.exists()) 
//			{
//				helper.addAttachment(attachment.getName(), attachment);
//			}
//		} 
//		catch (Exception e) 
//		{
//			return "Error in sending mail";
//		}
//
//		javamailsender.send(mimeMessage);
//
//		
//		return "Invoice send Successfully";
//	}
//
//}


package com.example.Vehicle_Configurator.services;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.Vehicle_Configurator.entity.EmailDetails;
import com.example.Vehicle_Configurator.entity.User;
import com.example.Vehicle_Configurator.repository.UserRepository;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javamailsender;

    @Autowired
    private UserRepository userRepository;

    @Override
    public String loginEmail(String toEmailId, String subject, String body) {

        // Fetch all users from the database
        List<User> users = userRepository.findAll();
        User matchedUser = null;

        for (User user : users) {
            if (toEmailId.equals(user.getEmail())) {
                matchedUser = user;
                break;
            }
        }

        if (matchedUser == null) {
            return "Email address not found in the database";
        }

        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setFrom(matchedUser.getEmail()); // Set from email address
        smm.setTo(toEmailId);
        smm.setSubject(subject);
        smm.setText(body);

        javamailsender.send(smm);

        return "Email sent successfully";
    }

    @Override
    public String invoiceEmail(String toEmailId, String subject, String body) {

        MimeMessage mimeMessage = javamailsender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(toEmailId);
            helper.setSubject(subject);
            helper.setText(body);
            File attachment = new File("C:/Users/SHUBHAM ZARGAD/Desktop/abc.pdf");
            if (attachment != null && attachment.exists()) {
                helper.addAttachment(attachment.getName(), attachment);
            }
        } catch (Exception e) {
            return "Error in sending mail";
        }

        javamailsender.send(mimeMessage);

        return "Invoice sent successfully";
    }
}
