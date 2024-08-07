package com.example.Vehicle_Configurator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Vehicle_Configurator.entity.User;
import java.util.List;

public interface EmailRepository extends JpaRepository<User, Integer> {
    List<User> findAll(); // Fetch all users
}
