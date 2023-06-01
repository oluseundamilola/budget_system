package com.demo.budget.DAOmodel;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "finance")
public class Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long finance_id;
    private long total_budget;
    private long remaining_amount;
    private long percent;
}
