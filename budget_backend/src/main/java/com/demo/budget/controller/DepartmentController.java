package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DTO.DepartmentDTO;
import com.demo.budget.services.DepartmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/department")
public class DepartmentController {

    @Autowired
    private DepartmentServices departmentServices;

    @PostMapping(path = "/add_department")
    public ResponseEntity<?> addDepartment(@RequestBody DepartmentDTO departmentDTO) {
        departmentDTO.setCreated_at(LocalDateTime.now());
        Department department = departmentServices.addDepartment(departmentDTO);
        return ResponseEntity.ok(department);
    }

    //Get departments of Ministry loggedIN
    @GetMapping(path = "/get_department")
    public ResponseEntity<?> getDepartmentByMinistry(String email){
        List<DepartmentDTO> departments = departmentServices.getDepartmentByMinistry(email);
        return ResponseEntity.ok(departments);
    }


    @GetMapping("/all")
    public ResponseEntity<?> allDepartment() {
        List<Department> departments = departmentServices.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping(path = "/department_info/{department_id}")
    public ResponseEntity<?> getDepartmentInfo(@PathVariable Long department_id){
        return ResponseEntity.ok(departmentServices.getDepartmentInfo(department_id));

    }
}
