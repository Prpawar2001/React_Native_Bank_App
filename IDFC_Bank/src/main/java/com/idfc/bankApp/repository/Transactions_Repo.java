package com.idfc.bankApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.idfc.bankApp.model.Transactions;

@Repository
public interface Transactions_Repo extends MongoRepository<Transactions, Integer> {

}
