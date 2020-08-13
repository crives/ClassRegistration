package com.cognixia.jump.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.cognixia.jump.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, String>{

	public List<Course> findAll();

	public Optional<Course> findById(@Param("courseId") String courseId);

}
