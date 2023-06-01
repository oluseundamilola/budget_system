package com.demo.budget.repository;

import com.demo.budget.DAOmodel.Approver;
import com.demo.budget.DAOmodel.Finance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FinanceRepo extends JpaRepository<Finance, Long> {

    @Override
    Optional<Finance> findById(Long id);
}
