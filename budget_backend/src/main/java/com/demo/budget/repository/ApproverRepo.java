package com.demo.budget.repository;

import com.demo.budget.DAOmodel.Approver;
import com.demo.budget.DAOmodel.BudgetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApproverRepo extends JpaRepository<Approver, Long> {
    @Override
    Optional<Approver> findById(Long id);

//    @Query("SELECT request FROM Approver a JOIN a.requests request WHERE request.id = :request_id")
//    Optional<Object> findRequestById(long request_id);
}
