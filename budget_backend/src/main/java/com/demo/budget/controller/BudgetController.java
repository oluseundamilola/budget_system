package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Ministry;
import com.demo.budget.DTO.BudgetRequestDTO;
import com.demo.budget.DTO.MinistryDTO;
import com.demo.budget.repository.BudgetRepo;
import com.demo.budget.services.BudgetService;
import com.demo.budget.services.MinistryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private MinistryService ministryService;

//    @Autowired
//    private BudgetRepo budgetRepo;

    @PostMapping("/add_budget/{division_id}")
    public ResponseEntity<?> createBudgetRequest(@RequestBody BudgetRequestDTO budgetRequestDTO, @PathVariable long division_id ){
        return ResponseEntity.ok(budgetService.createBudgetRequest(budgetRequestDTO, division_id));
    }

    @PutMapping("/update_budget/{id}")
    public ResponseEntity<?> updateBudgetRequest(@RequestBody BudgetRequestDTO budgetRequestDTO, @PathVariable long id){
        return ResponseEntity.ok(budgetService.updateBudgetRequest(budgetRequestDTO, id));
    }

    @PutMapping("/send_to_approver/{budget_id}")
    public ResponseEntity<?> sendRequestToApprover(@PathVariable long budget_id){
        return ResponseEntity.ok(budgetService.sendRequestToApprover(budget_id));
    }

    @GetMapping("/get_requests/{division_id}")
    public ResponseEntity<?> getRequestsByDivision(@PathVariable long division_id){
        return ResponseEntity.ok(budgetService.getRequestByDivision(division_id));
    }

    @GetMapping("/requests_by_status/{status}")
    public ResponseEntity<?> getRequestsByStatus(@PathVariable String status){
        return ResponseEntity.ok(budgetService.getRequestByStatus(status));
    }

    @GetMapping("/request_by_ministry")
    public ResponseEntity<?> getRequestByName(){
        String user_email = request.getUserPrincipal().getName();
        MinistryDTO ministryDTO = ministryService.getMinistryInfo(user_email);
        return ResponseEntity.ok(budgetService.getRequestByMinistryName(ministryDTO.getName()));
    }

//    @GetMapping("/get_request/{id}")
//    public ResponseEntity<?> getRequestById(@PathVariable long id){
//        return ResponseEntity.ok(budgetRepo.findById(id));
//    }

}
