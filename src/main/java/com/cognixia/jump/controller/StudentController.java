package com.cognixia.jump.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Student;
import com.cognixia.jump.repository.StudentRepository;

@RequestMapping("/api")
@RestController
public class StudentController {
	
	@Autowired
	StudentRepository service;
	
	@GetMapping("/students")
	public List<Student> getAllStudents(){
		return service.findAll();
	}
	
	@GetMapping("/students/usernames")
	public List<String> getAllUsernames(){
		List<String> usernames = service.getUsernames();
		
		return usernames;
	}
	
	@GetMapping("/students/passwords")
	public List<String> getAllPasswords(){
		List<String> passwords = service.getPasswords();
		
		return passwords;
	}
		

	@GetMapping("/students/id/{username}")
	public Long getIdbyUsername(@PathVariable String username){
		List<Student> students = service.findAll();
		Long notfound = Long.parseLong("0");
		for(Student student: students) {
			if(student.getUsername().equals(username)) {
				return student.getId();
			
			}
		}
		return notfound;
	
	}
		
			
			
			
		



}