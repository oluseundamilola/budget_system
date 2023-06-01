package com.demo.budget.services;

import com.demo.budget.DAOmodel.Approver;
import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DAOmodel.Finance;
import com.demo.budget.DTO.ApproverDTO;
import com.demo.budget.repository.ApproverRepo;
import com.demo.budget.repository.BudgetRepo;
import com.demo.budget.repository.FinanceRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApproverService {
    @Autowired
    private ApproverRepo approverRepo;
    @Autowired
    private BudgetRepo budgetRepo;
    @Autowired
    private FinanceRepo financeRepo;


    public Object createApprover(Approver approver) {
        return approverRepo.save(approver);
    }


    public ApproverDTO getApprover(){
        Approver approver = getApproverById(1);
        ModelMapper mapper = new ModelMapper();
        ApproverDTO approverDTO = mapper.map(approver, ApproverDTO.class);
        return approverDTO;
    }


    public void saveApprover(Approver approver){
        approverRepo.save(approver);
    }

//    public List<BudgetRequestDTO> getAllDivisionsRequest() {
//        Approver approver = getApproverById(1);
//        return approver.getRequests().stream()
//                .map(approverRequestContent -> BudgetRequestDTO.builder()
//                        .budget_name(approverRequestContent.getBudget_name())
//                        .budget_description(approverRequestContent.getBudget_description())
//                        .amount(approverRequestContent.getAmount())
//                        .status(approverRequestContent.getStatus())
//                        .division_name(approverRequestContent.getDivision().getDivisionName())
//                        .departmet_name(approverRequestContent.getDivision().getDepartmentName())
//                        .ministry_name(approverRequestContent.getDivision().getMinistryName())
//                        .build()
//                ).collect(Collectors.toList());
//    }

    public Approver getApproverById(long id) {
        Approver approver = approverRepo.findById(id).get();
        return approver;
    }



    public Object approveRequest(long request_id, long finance_id) {
        //get request and financeInfo to update
        BudgetRequest budgetRequest = budgetRepo.findById(request_id).get();
        Finance finance = financeRepo.findById(finance_id).get();
        long amountToBeRemoved = budgetRequest.getAmount();
        long remainingMoney = finance.getRemaining_amount();
        long newRemainingAmount = remainingMoney - amountToBeRemoved;
        long percent;
        long total_amount;
        long amount_spent;
        if(budgetRequest.getStatus().equalsIgnoreCase("Pending")){
            budgetRequest.setStatus("Approved");
            finance.setRemaining_amount(newRemainingAmount);
            total_amount = finance.getTotal_budget();
            amount_spent = budgetRequest.getAmount();
            percent = calculate_percentage(amount_spent, total_amount);
            finance.setPercent(percent);
            budgetRepo.save(budgetRequest);
            financeRepo.save(finance);
        }
        else {
            return ("Request has to be sent, before Approving");
        }
        return ("Success");

    }

    private long calculate_percentage(long amount_spent, long total_amount) {
        double percentage = ((double) amount_spent / total_amount) * 100;
        return (long) percentage;
    }


}
