
package com.cognixia.jump.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Student;

@Repository

public interface StudentRepository extends JpaRepository<Student, Long> {
	
	
	@Query("select username from Student")
	List<String> getUsernames();
	
	@Query("select password from Student")
	List<String> getPasswords();


}

