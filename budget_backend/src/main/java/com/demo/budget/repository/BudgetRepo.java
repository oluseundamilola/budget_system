package com.demo.budget.repository;

import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DAOmodel.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepo extends JpaRepository<BudgetRequest, Long> {

    @Override
    Optional<BudgetRequest> findById(Long id);

    @Query("select request from BudgetRequest request where request.division.id = :division_id")
    List<BudgetRequest> findRequestByDivision(Long division_id);

    @Query("select requests from BudgetRequest requests where requests.status like :status")
    List<BudgetRequest> getRequestByStatus(String status);

    @Query("select count(r) from BudgetRequest r where r.status like 'Pending'")
    long countAllRequests();

    @Query("select r from BudgetRequest r where r.division.ministryName like :ministry_name")
    List<BudgetRequest> getRequestByMinistryName(String ministry_name);
}
