package com.example.Vehicle_Configurator.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Vehicle_Configurator.entity.User;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
 
	 @Query("SELECT count(u)>0 FROM User u WHERE u.username = :username AND u.password = :password")
	 boolean validateUser(@Param("username") String username, @Param("password") String password);
	 
	 @Query(value="SELECT  * FROM User Where username=:username",nativeQuery=true)
	 String getUserByUsername(@Param("username")String username);
	 
	
}
