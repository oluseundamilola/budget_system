package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Division;
import com.demo.budget.DTO.DivisionDTO;
import com.demo.budget.services.DivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/division")
public class DivisionController {

    @Autowired
    private DivisionService divisionService;

    @PostMapping("/add_division/{department_id}")
    public ResponseEntity<?> addDivision(@RequestBody DivisionDTO divisionDTO, @PathVariable Long department_id){
        divisionService.addDivision(divisionDTO, department_id);
        return ResponseEntity.ok("Division added to DB");
    }

    @GetMapping("/get_divisions/{department_id}")
    public ResponseEntity<?> getDivisionByDepartment(@PathVariable Long department_id){
        return ResponseEntity.ok(divisionService.getDivisionByDepartment(department_id));
    }

    @GetMapping("/division_info/{division_id}")
    public ResponseEntity<?> getDivisionByID(@PathVariable long division_id){
        return ResponseEntity.ok(divisionService.getDivisionById_V2(division_id));
    }


    @PostMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Endpoint works");
    }

}
