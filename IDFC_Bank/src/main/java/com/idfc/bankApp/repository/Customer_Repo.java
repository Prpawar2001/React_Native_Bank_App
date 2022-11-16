package com.idfc.bankApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.idfc.bankApp.model.Customer;

@Repository
public interface Customer_Repo extends MongoRepository<Customer, Integer> {

}
