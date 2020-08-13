package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.persistence.GenerationType;


@Entity
public class Student implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank
	private String username;
	
	@Column(columnDefinition = "char(20) default '**********'")
	@NotBlank
	private String password;
	
	@NotBlank
	private String firstName;
	
	@NotBlank
	private String lastName;
	
	@Column(columnDefinition = "int default '0'")
	private Integer creditHours;
	
	public Student() {
		this(-1L,"NA","NA","NA","NA",1);
	}

	public Student(Long id, @NotBlank String username, @NotBlank String password, @NotBlank String firstName,
			@NotBlank String lastName, Integer creditHours) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.creditHours = creditHours;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getCreditHours() {
		return creditHours;
	}

	public void setCreditHours(Integer creditHours) {
		this.creditHours = creditHours;
	}

	@Override
	public String toString() {
		return "Student id=" + id + ", username=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", creditHours=" + creditHours + "   ";
	}

}
