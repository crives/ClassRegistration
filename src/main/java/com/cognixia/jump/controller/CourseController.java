package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cognixia.jump.model.Course;
import com.cognixia.jump.repository.CourseRepository;

@RequestMapping("/api")
@RestController
public class CourseController {
	
	@Autowired
	CourseRepository service;

	@GetMapping("/courses")
	public List<Course> getAllCourses() {
		
		return service.findAll();
	}
	
	@GetMapping("/courses/{courseId}")
	public Course getCourse(@PathVariable String courseId) {
		
		Optional<Course> courseOpt = service.findById(courseId);
		
		if(courseOpt.isPresent()) {
			return courseOpt.get();
			
		}
		
		return new Course();
	}
	
	@PostMapping("/courses/add")
	public void addCourse(@RequestBody Course addedCourse) {
		service.save(addedCourse);
	}
	
	@DeleteMapping("/courses/delete/{courseId}")
	public ResponseEntity<String> deleteRegistration(@PathVariable String courseId) {
		
		Optional<Course> found = service.findById(courseId);
		
		if(found.isPresent()) {
			
			service.deleteById(courseId);
			return ResponseEntity.status(200).body("Deleted registration with id = "
					+ courseId);
		} else {
			return ResponseEntity.status(400)
					.header("registration id", courseId + "")
					.body("Registration with id = " + courseId + " not found");
		}
		
	}
	
}
