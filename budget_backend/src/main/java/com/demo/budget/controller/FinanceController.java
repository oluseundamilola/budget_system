package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Finance;
import com.demo.budget.services.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/finance")
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    @PostMapping("/add_finance")
    public ResponseEntity<?> createFinance(@RequestBody Finance finance){
        return ResponseEntity.ok(financeService.addFinanceInfo(finance));
    }

    @GetMapping("/finance_info/{id}")
    public ResponseEntity<?> getFinanceInfo(@PathVariable Long id){
        return ResponseEntity.ok(financeService.getFinanceInfo(id));
    }
}
