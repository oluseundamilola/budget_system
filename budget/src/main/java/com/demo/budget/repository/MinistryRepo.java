package com.demo.budget.repository;

import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DAOmodel.Ministry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MinistryRepo extends JpaRepository<Ministry, Long> {

    @Override
    Optional<Ministry> findById(Long id);

    Optional<Ministry> findOneByEmail(String email);

    Optional<Ministry> findByName(String name);

    @Query("select count(m) from Ministry m")
    long countAllMinistry();


}
