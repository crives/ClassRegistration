package com.cognixia.jump.controller;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.exception.ResourceNotFoundException;
import com.cognixia.jump.model.Registration;
import com.cognixia.jump.repository.RegistrationRepository;


@RequestMapping("/api")
@RestController
public class RegistrationController {
	
	@Autowired
	RegistrationRepository service;
	
	@GetMapping("/registration")
	public List<Registration> getAllRegistrations() {
		  
		return service.findAll();
	} 
	
	
	@PostMapping("/registration/add")
	public void addStudent(@RequestBody Registration newRegistration) {
		service.save(newRegistration);
	}
	
	
	@GetMapping("/registration/{studentId}")
	public List<Registration> getRegistrationByStudentId(@PathVariable long studentId) throws Exception{
		
		Optional<List<Registration>> optional = service.findByStudentId(studentId);
		 
		if(optional.get().isEmpty()) {
			throw new ResourceNotFoundException("Registration with studentId = " + studentId + " not found");
		}
		else return optional.get();
		 
		//return new Student();
	}

	@DeleteMapping("/registration/delete/{registrationId}")
	public ResponseEntity<String> deleteRegistration(@PathVariable long registrationId ) throws Exception {
		
		Optional<Registration> found = service.findByRegistrationId(registrationId);
		
		if(found.isPresent()) {
			
			service.deleteByRegistrationId(registrationId);
			
			return ResponseEntity.status(200).body("Deleted animal with id = " + registrationId);	
			}
		else {
			return ResponseEntity.status(400)
					.header("animal id", registrationId + "")
					.body("animal with id = " + registrationId + " not found");
		}
			
	}

}








