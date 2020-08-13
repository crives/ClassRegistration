package com.cognixia.jump.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Course implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "course_id", unique=true, columnDefinition="varchar(6)")
	private String courseId;
	
	@Column(name = "department")
	private String department;
	
	@Column(name = "name")
	String name;
	
	@Column(name = "credits")
	int credits;
	
	@Column(name = "description", columnDefinition="varchar(500)")
	String description;
	
	@Column(name = "prereqs", columnDefinition="varchar(255)")
	String prerequisites;

	
	public Course(String courseId, String department, String name, int credits, String description,
			String prerequisites) {
		super();
		this.courseId = courseId;
		this.department = department;
		this.name = name;
		this.credits = credits;
		this.description = description;
		this.prerequisites = prerequisites;
	}

	
	public Course() {
		this("N/A", "N/A", "N/A", -1, "N/A", "N/A");
	}
	
	public String getCourseId() {
		return courseId;
	}

	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCredits() {
		return credits;
	}

	public void setCredits(int credits) {
		this.credits = credits;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPrerequisites() {
		return prerequisites;
	}

	public void setPrerequisites(String prerequisites) {
		this.prerequisites = prerequisites;
	}

	@Override
	public String toString() {
		return "Course [courseId=" + courseId + ", department=" + department + ", name=" + name + ", credits=" + credits
				+ ", description=" + description + ", prerequisites=" + prerequisites + "]";
	}

}
