package com.cognixia.jump.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Registration;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
	
	//@Query("SELECT u FROM Registration u WHERE studentId = ?1")
	Optional<List<Registration>> findByStudentId(long studentId);
	
	//@Query
	Optional<Registration> findByStudentIdAndCourseId(@Param(value = "studentId")long studentId, @Param(value = "courseId") String courseId);
//	
//	@Query("DELETE u FROM REGISTRATION WHERE studentId = ?1 courseId= ?2")
//	void deleteByStudentIDandCourseID(long studentId, String courseId);
}
