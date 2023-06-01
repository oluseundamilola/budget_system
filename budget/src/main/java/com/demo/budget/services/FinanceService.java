package com.demo.budget.services;

import com.demo.budget.DAOmodel.Finance;
import com.demo.budget.repository.FinanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinanceService {
    @Autowired
    private FinanceRepo financeRepo;

    public Object addFinanceInfo(Finance finance) {
        financeRepo.save(finance);
        return finance;
    }

    public Object getFinanceInfo(Long id) {
        return (financeRepo.findById(id).get());
    }
}
