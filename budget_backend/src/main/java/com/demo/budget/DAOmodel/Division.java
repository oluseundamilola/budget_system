package com.demo.budget.DAOmodel;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "division")
public class Division {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String divisionName;
    private String divisionCode;
    private String ministryName;
    private String departmentName;

    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id" )
    private Department department;
}
