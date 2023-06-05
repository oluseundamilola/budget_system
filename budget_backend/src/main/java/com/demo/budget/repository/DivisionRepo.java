package com.demo.budget.repository;

import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DAOmodel.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DivisionRepo extends JpaRepository<Division, Long> {

    @Query("select division from Division division where division.department.id = :department_id")
    List<Division> findDivisionsByDepartment(Long department_id);

    @Query("select count(division) from Division division where division.department.id = :department_id")
    long countDivisionInDepart(Long department_id);

    @Override
    Optional<Division> findById(Long id);

    @Query("select count(d) from Division d")
    long countAllDivisions();
}
