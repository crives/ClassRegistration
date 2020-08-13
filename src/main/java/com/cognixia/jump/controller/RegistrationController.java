package com.cognixia.jump.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	
//	@GetMapping("/registration/{studentId}")
//	public List<Registration> getRegistrationByStudentId(@PathVariable long studentId) throws Exception{
//		
//		Optional<List<Registration>> optional = service.findByStudentId(studentId);
//		 
//		if(optional.get().isEmpty()) {
//			throw new ResourceNotFoundException("Registration with studentId = " + studentId + " not found");
//		}
//		else return optional.get();
//		 
//		//return new Student();
//	}

//	@DeleteMapping("/delete/Registration")
//	public ResponseEntity<String> deleteStudent(@RequestBody Map<String, String> registrationInfo) throws Exception {
//	 	
//		long studentId = Long.parseLong( registrationInfo.get("studentId") );
//		String courseId = registrationInfo.get("courseId");
//		
//		Registration registration = service.findByStudentIDandCourseID(studentId, courseId);
//		
//		if(registration!=null) {
//			service.deleteByStudentIDandCourseID(studentId, courseId);
//			
//			return ResponseEntity.status(200).body("Deleted registration with studentiId = " + studentId + " and courseId" + courseId);	
//		}
//		else {
//			return ResponseEntity.status(400)
//					.body("Registration with studentId = " + studentId + " and courseId" + courseId + " was not found");
//		}
//			
//	}

}








