package com.demo.budget.DTO;

import com.demo.budget.DAOmodel.Department;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MinistryDTO {

    private long id;
    private String name;
    private String description;
    private long departmentCount;
    private String location;
    private String sector;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String role;
    private String status;
    private List<DepartmentDTO> departments;
}
