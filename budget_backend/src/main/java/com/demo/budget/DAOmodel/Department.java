package com.demo.budget.DAOmodel;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long department_id;

    @Column(unique = true)
    private String ministryName;
    private String description;

    private String name;

    @Column(updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "ministry_id", referencedColumnName = "ministry_id", nullable = false)
    private Ministry ministry;


}
