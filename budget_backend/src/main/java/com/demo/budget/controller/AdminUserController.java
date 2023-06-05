package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Users;
import com.demo.budget.DTO.MinistryDTO;
import com.demo.budget.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/admin")
public class AdminUserController {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder encoder;

    @PostMapping(path = "add_user")
    public ResponseEntity<?> addUser(Users user) {
//        user.setLastname("approver");
//        user.setLastname("approver");
//        user.setEmail("approver@gmail.com");
//        user.setPassword(encoder.encode("1234"));
//        user.setRole("ROLE_APPROVER");
//        user.setStatus("active");
//        userRepo.save(user);
//        return ResponseEntity.ok(user);

        //Add new admin

        user.setLastname("admin");
        user.setLastname("admin");
        user.setEmail("admin@admin.com");
        user.setPassword(encoder.encode("1234"));
        user.setRole("ROLE_ADMIN");
        user.setStatus("active");
        userRepo.save(user);
        return ResponseEntity.ok(user);

    }
}
