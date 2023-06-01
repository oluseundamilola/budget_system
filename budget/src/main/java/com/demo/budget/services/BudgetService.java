package com.demo.budget.services;

import com.demo.budget.DAOmodel.Approver;
import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DTO.BudgetRequestDTO;
import com.demo.budget.repository.BudgetRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class BudgetService {
    @Autowired
    private BudgetRepo budgetRepo;
    @Autowired
    private DivisionService divisionService;

    @Autowired
    private ApproverService approverService;
    public Object createBudgetRequest(BudgetRequestDTO budgetRequestDTO, long division_id) {
        ModelMapper mapper = new ModelMapper();
        BudgetRequest budgetRequest = mapper.map(budgetRequestDTO, BudgetRequest.class);
        budgetRequest.setDivision(divisionService.getDivisionById(division_id));
        budgetRequest.setStatus("Created");
        budgetRepo.save(budgetRequest);
        return "Request created!";
    }

    public Object sendRequestToApprover(long budget_id) {
        //get budget to send
        BudgetRequest budgetRequest = budgetRepo.findById(budget_id).get();
        //get the approver
//        Approver approver = approverService.getApproverById(1);
        //update approver's request list
//        approver.getRequests().add(budgetRequest);
        //update budgetRequest status
        budgetRequest.setStatus("Pending");
        budgetRepo.save(budgetRequest);
//        approverService.saveApprover(approver);
        return "Request Sent";
    }

    public Object updateBudgetRequest(BudgetRequestDTO budgetRequestDTO, long id) {
        BudgetRequest budgetRequestToUpdate = budgetRepo.findById(id).get();

        budgetRequestToUpdate.setBudget_description(budgetRequestDTO.getBudget_description());
        budgetRequestToUpdate.setAmount(budgetRequestDTO.getAmount());
        budgetRequestToUpdate.setBudget_name(budgetRequestDTO.getBudget_name());
        return budgetRepo.save(budgetRequestToUpdate);
    }

    public Object getRequestByDivision(long divisionId) {
        List<BudgetRequest> requests = budgetRepo.findRequestByDivision(divisionId);
        return  requests.stream()
                .map(request -> BudgetRequestDTO.builder()
                        .budget_name(request.getBudget_name())
                        .budget_description(request.getBudget_description())
                        .amount(request.getAmount())
                        .status(request.getStatus())
                        .build()
                ).collect(Collectors.toList());
    }

    public Object getRequestByStatus(String status) {
        List<BudgetRequest> requests = budgetRepo.getRequestByStatus(status);
        return requests.stream()
                .map(request -> BudgetRequestDTO.builder()
                        .id(request.getId())
                        .budget_name(request.getBudget_name())
                        .budget_description(request.getBudget_description())
                        .amount(request.getAmount())
                        .status(request.getStatus())
                        .division_name(request.getDivision().getDivisionName())
                        .departmet_name(request.getDivision().getDepartmentName())
                        .ministry_name(request.getDivision().getMinistryName())
                        .build()
                ).collect(Collectors.toList());
    }

    public Object getRequestByMinistryName(String ministryName) {
        List<BudgetRequest> requests = budgetRepo.getRequestByMinistryName(ministryName);
        return requests.stream()
                .map(request -> BudgetRequestDTO.builder()
                        .id(request.getId())
                        .budget_name(request.getBudget_name())
                        .budget_description(request.getBudget_description())
                        .amount((request.getAmount()))
                        .status(request.getStatus())
                        .division_name(request.getDivision().getDivisionName())
                        .departmet_name(request.getDivision().getDepartmentName())
                        .division_id(request.getDivision().getId())
                        .build()
                ).collect(Collectors.toList());
    }
}
