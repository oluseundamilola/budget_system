package com.demo.budget.DAOmodel;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "approver")
public class Approver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approver_id;
    private String name;
    private String role;

//    @OneToMany
//    private List<BudgetRequest> requests = new ArrayList<>();
}
