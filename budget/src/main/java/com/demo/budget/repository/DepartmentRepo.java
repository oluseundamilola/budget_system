package com.demo.budget.repository;

import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DAOmodel.Ministry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepo extends JpaRepository<Department, Long> {

    @Override
    Optional<Department> findById(Long id);


    @Query("SELECT d from Department d WHERE d.ministry.email = :email")
    List<Department> getDepartmentsByMinistry(String email);

    @Query("SELECT COUNT(d) from Department d where d.ministry.name = :name")
    long countDepartmentInMinistry(String name);

    @Query("select count(d) from Department d")
    long countAllDepartment();

}
