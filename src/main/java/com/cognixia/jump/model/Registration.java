package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Id;


@Entity
public class Registration implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column
	private Long studentId;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long registrationId;
	
	@Column(unique = true, nullable = false)
	private String courseId;

	public Registration() {
		this(-1L, "N/A", -1L);
	}
	
	public Registration(Long studentId, String courseId, Long registrationId) {
		super();
		this.studentId = studentId;
		this.courseId = courseId;
		this.registrationId = registrationId;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getCourseId() {
		return courseId;
	}

	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	

	public Long getRegistrationId() {
		return registrationId;
	}

	public void setRegistrationId(Long registrationId) {
		this.registrationId = registrationId;
	}

	@Override
	public String toString() {
		return "Registration [studentId=" + studentId + ", courseId=" + courseId + "]";
	}
	
}
	
