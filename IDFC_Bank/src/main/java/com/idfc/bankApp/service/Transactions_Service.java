package com.idfc.bankApp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idfc.bankApp.model.Customer;
import com.idfc.bankApp.model.Transactions;
import com.idfc.bankApp.repository.Customer_Repo;
import com.idfc.bankApp.repository.Transactions_Repo;

@Service
public class Transactions_Service {
	
	Customer customer = new Customer();
	Transactions transaction = new Transactions();

	@Autowired
	private Transactions_Repo tran_repo;
	
	@Autowired
	private Customer_Repo cust_repo;
	
	public String viewBalance(int id) {
		return "Your account balance is, " + cust_repo.findById(id).get().getBalance();
	}
	
	public String Deposit(int accNo, double amount) {
		tran_repo.save(new Transactions(accNo,accNo,amount,"Deposit"));
		customer = cust_repo.findById(accNo).get();
		customer.setBalance(customer.getBalance() + amount);
		cust_repo.save(customer);
		return "Amount " + amount +" Deposited Sucessfully !!";
	}
	
	public String Withdraw(int accNo, double amount) {
		if(cust_repo.findById(accNo).get().getBalance() > amount) {
			tran_repo.save(new Transactions(accNo,accNo,amount,"Withdraw"));
			customer = cust_repo.findById(accNo).get();
			customer.setBalance(customer.getBalance() - amount);
			cust_repo.save(customer);
			return "Amount " + amount +" Withdrawn Sucessfully !!";
		}else {
			return "Insufficient Balance !!";
		}	
	}
	
	public String Transfer(int accNo, double amount, int receiver) {
		if(cust_repo.findById(accNo).get().getBalance() > amount) {
			if(cust_repo.existsById(receiver)) {
				tran_repo.save(new Transactions(accNo,receiver,amount,"Transfer"));
				customer = cust_repo.findById(accNo).get();
				customer.setBalance(customer.getBalance() - amount);
				cust_repo.save(customer);
				customer = cust_repo.findById(receiver).get();
				customer.setBalance(customer.getBalance() + amount);
				cust_repo.save(customer);
				return "Amount " + amount +" Transferred Sucessfully !!";
			}else {
				return "Receiver Account doesnt exist !!";
			}
		}else {
			return "Insufficient Balance !!";
		}
		
		
	}
	
	public List<Transactions> history(int accNo) {
		return tran_repo.findAll().stream()
				.filter(ab -> ((ab.getAcc_no() == accNo) || (ab.getReceiverAcc_no() == accNo))).toList();
	}
	
}
