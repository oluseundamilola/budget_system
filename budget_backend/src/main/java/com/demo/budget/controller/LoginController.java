package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Users;
import com.demo.budget.DTO.AuthRequestDTO;
import com.demo.budget.repository.UserRepo;
import com.demo.budget.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/login")
public class LoginController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserRepo userRepo;

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequestDTO authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail().toLowerCase(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmail());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/role")
    public String getUserRole() {
        String email = request.getUserPrincipal().getName();
        Users user = userRepo.findOneByEmail(email).get();
        String user_role = user.getRole();
        return user_role;
    }

    @GetMapping("user_info")
    public ResponseEntity<?> getUserInfo(){
        String email = request.getUserPrincipal().getName();
        Users user = userRepo.findOneByEmail(email).get();
        return ResponseEntity.ok(user);
    }

}
