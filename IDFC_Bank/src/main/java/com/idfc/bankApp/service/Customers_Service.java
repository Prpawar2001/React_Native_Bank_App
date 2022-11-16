package com.idfc.bankApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idfc.bankApp.model.Customer;
import com.idfc.bankApp.model.Transactions;
import com.idfc.bankApp.repository.Customer_Repo;
import com.idfc.bankApp.repository.Transactions_Repo;

@Service
public class Customers_Service {

	@Autowired
	private Customer_Repo cust_repo;
	
	@Autowired
	private Transactions_Repo transactions_Repo;
	
	public String addCustomer(Customer customer) {
		if(!cust_repo.existsById(customer.getAcc_no())) {
			cust_repo.save(customer);
			transactions_Repo.save(new Transactions(customer.getAcc_no(),customer.getAcc_no(),customer.getBalance(),"Deposit"));
			return "Account Created Sucessfully !!";
		}else {
			return "Account already exists !!";
		}
	}
	
	public String updatePass(int accNo, String email, String password) {
		if(cust_repo.existsById(accNo)) {
			if(cust_repo.findById(accNo).get().getEmail().equals(email)) {
				Customer c = cust_repo.findById(accNo).get();
				c.setPassword(password);
				cust_repo.save(c);
				return "Password updated Sucessfully !!";
			}else {
				return "You don't seems to ba an owner of this account !! Please Check email !!";
			}
		}else {
			return "Account does not exists !!";
		}
	}
	
	public Customer getCustomer(int id) {
		if(cust_repo.existsById(id)==true) {
			return cust_repo.findById(id).get();
		}
		return null;
	}
	
	public List<Customer> getCustomer() {
		return cust_repo.findAll();
	}
	
	public String updateCustomer(Customer customer) {
		if(cust_repo.existsById(customer.getAcc_no())) {
			Customer c = cust_repo.findById(customer.getAcc_no()).get();
			if(customer.getCust_name() != null && customer.getCust_name() != "") {
				c.setCust_name(customer.getCust_name());
			}
			if(customer.getEmail() != null && customer.getEmail() != "") {
				c.setEmail(customer.getEmail());
			}
			if(customer.getPhone_no() != null && customer.getPhone_no() != "") {
				c.setPhone_no(customer.getPhone_no());
			}
			if(customer.getCity() != null && customer.getCity() != "") {
				c.setCity(customer.getCity());
			}
			cust_repo.save(c);
			return "Account Updated Sucessfully !!";
		}else {
			return "Account does not exists !!";
		}
	}
	
	public String deleteCustomer(int id) {
		if(cust_repo.existsById(id)) {
			cust_repo.deleteById(id);
			return "Account Deleted Sucessfully !!";
		}else {
			return "Account does not exists !!";
		}
	}
}
