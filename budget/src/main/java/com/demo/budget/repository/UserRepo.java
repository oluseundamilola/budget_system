package com.demo.budget.repository;

import com.demo.budget.DAOmodel.Ministry;
import com.demo.budget.DAOmodel.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

    @Override
    Optional<Users> findById(Long id);

    Optional<Users> findOneByEmail(String email);
//    Optional<Users> findByName(String name);
}
