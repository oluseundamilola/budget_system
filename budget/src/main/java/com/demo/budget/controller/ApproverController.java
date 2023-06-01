package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Approver;
import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DTO.BudgetRequestDTO;
import com.demo.budget.services.ApproverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/approver")
public class ApproverController {
    @Autowired
    private ApproverService approverService;

    @PostMapping("/add_approver")
    public ResponseEntity<?> createApprover(@RequestBody Approver approver ){
        return ResponseEntity.ok(approverService.createApprover(approver));
    }


//    @GetMapping("/division_requests")
//    @PreAuthorize("hasAuthority('ROLE_APPROVER')")
//    public ResponseEntity<?> getAllDivisionsRequest(){
//        List<BudgetRequestDTO> budgetRequestDTOList = approverService.getAllDivisionsRequest();
//        return ResponseEntity.ok(budgetRequestDTOList);
//    }

    @PutMapping("approve_request/{request_id}/{finance_id}")
    @PreAuthorize("hasAuthority('ROLE_APPROVER')")
    public ResponseEntity<?> approveRequest(@PathVariable long request_id, @PathVariable long finance_id){
        return ResponseEntity.ok(approverService.approveRequest(request_id,finance_id));
    }

    @GetMapping("/get_approver")
    public ResponseEntity<?> getApproverById(){
        return ResponseEntity.ok(approverService.getApprover());
    }

//    @GetMapping("/get_approver/{id}")
//    public ResponseEntity<?> getApproverById(@PathVariable long id){
//        return ResponseEntity.ok(approverService.getApproverById(id));
//    }
}
