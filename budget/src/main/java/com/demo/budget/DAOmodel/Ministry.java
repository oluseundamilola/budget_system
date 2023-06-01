package com.demo.budget.DAOmodel;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ministry")
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Ministry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ministry_id;

    private String name;
    private String description;
    private String location;
    private String sector;


    @Transient
    private String firstname;
    @Transient
    private String lastname;
    private String email;
    @Transient
    private String password;
    @Transient
    private String role;
    @Transient
    private String status;
}
