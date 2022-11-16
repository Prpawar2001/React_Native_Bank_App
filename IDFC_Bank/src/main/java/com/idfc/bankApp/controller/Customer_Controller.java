package com.idfc.bankApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idfc.bankApp.model.Customer;
import com.idfc.bankApp.model.Transactions;
import com.idfc.bankApp.service.Customers_Service;
import com.idfc.bankApp.service.Transactions_Service;

@RestController
@RequestMapping("IDFC/Customer/")
public class Customer_Controller {
	
	@Autowired
	private Transactions_Service Transaction_service;
	
	@Autowired
	private Customers_Service Customers_service;
	
//	Create Account --> SignUp
	@PostMapping("createAcc")
	public String createAcc(@RequestBody Customer customer) {
		return Customers_service.addCustomer(customer);
	}
	
//	Update Password --> Forgot Password
	@PostMapping("updatePassword/{accNo}/{email}/{password}")
	public String updatePassword(@PathVariable int accNo,@PathVariable String email,@PathVariable String password) {
		return Customers_service.updatePass(accNo, email, password);
	}
	
//	Update Account Details
	@PutMapping("updateAcc")
	public String updateAcc(@RequestBody Customer customer) {
		return Customers_service.updateCustomer(customer);
	}
	
//	For login in React Native App or at frontend
	@GetMapping("getAccount/login/{accNo}")
	public Customer getAccount(@PathVariable int accNo) {
		return Customers_service.getCustomer(accNo);
	}
	
//	View Balance
	@GetMapping("viewBalance/{accNo}")
	public String Balance(@PathVariable int accNo) {
		return Transaction_service.viewBalance(accNo);
	}
	
//	Deposit Amount
	@PostMapping("deposit/{accNo}/{amount}")
	public String Deposit(@PathVariable int accNo, @PathVariable double amount) {
		return Transaction_service.Deposit(accNo, amount);
	}
	
//	Withdraw Amount
	@PostMapping("withdraw/{accNo}/{amount}")
	public String Withdraw(@PathVariable int accNo, @PathVariable double amount) {
		return Transaction_service.Withdraw(accNo, amount);
	}
	
//	Transfer Amount
	@PostMapping("transfer/{accNo}/{amount}/{receiver}")
	public String Transfer(@PathVariable int accNo, @PathVariable double amount, @PathVariable int receiver) {
		return Transaction_service.Transfer(accNo, amount, receiver);
	}
	
//	Transaction History
	@GetMapping("history/{accNo}")
	public List<Transactions> transactionHistory(@PathVariable int accNo){
		return Transaction_service.history(accNo);
	}
	
}
