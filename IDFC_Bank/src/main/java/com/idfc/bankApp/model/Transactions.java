package com.idfc.bankApp.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="Transactions")
public class Transactions {

	private int acc_no;	
	private int receiverAcc_no;
	private double amount;
	private String type;
	
}
