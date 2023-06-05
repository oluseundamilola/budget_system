package com.demo.budget.DAOmodel;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "budget_request")
public class BudgetRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String budget_name;
    private String budget_description;
    private long amount;
    private String status;


    @NotNull
    @ManyToOne
    @JoinColumn(name = "division_id", referencedColumnName = "id", nullable = false)
    private Division division;

}
