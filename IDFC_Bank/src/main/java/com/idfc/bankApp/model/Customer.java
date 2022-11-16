package com.idfc.bankApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="Customers")
public class Customer {

	@Id
	private int acc_no;
	
	private String cust_name;
	private String email;
	private String password;
	private String phone_no;
	private String city;
	private double balance;
}
