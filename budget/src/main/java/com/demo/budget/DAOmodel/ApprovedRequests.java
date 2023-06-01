package com.demo.budget.DAOmodel;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "histroy")
public class ApprovedRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String division_name;
    private String department_name;
    private String request_name;
    private String request_desc;
    private long budget_amount;
}
