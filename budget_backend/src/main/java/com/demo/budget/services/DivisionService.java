package com.demo.budget.services;

import com.demo.budget.DAOmodel.BudgetRequest;
import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DAOmodel.Division;
import com.demo.budget.DTO.BudgetRequestDTO;
import com.demo.budget.DTO.DivisionDTO;
import com.demo.budget.repository.BudgetRepo;
import com.demo.budget.repository.DepartmentRepo;
import com.demo.budget.repository.DivisionRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DivisionService {

    @Autowired
    private DivisionRepo divisionRepo;

    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    private BudgetRepo budgetRepo;

    public void addDivision(DivisionDTO divisionDTO, Long departmentId) {
        Optional<Department> exisitingDepartment = departmentRepo.findById(departmentId);
        Department department = exisitingDepartment.get();
        ModelMapper mapper = new ModelMapper();
        Division division = mapper.map(divisionDTO, Division.class);
        if(department != null){
            division.setDepartmentName(department.getName());
            division.setMinistryName(department.getMinistryName());
            division.setDepartment(department);
        }
        divisionRepo.save(division);

    }

    public Object getDivisionByDepartment(Long departmentId) {
        List<Division> divisions = divisionRepo.findDivisionsByDepartment(departmentId);
        return divisions.stream()
                .map(division -> DivisionDTO.builder()
                        .id(division.getId())
                        .divisionName(division.getDivisionName())
                        .divisionCode(division.getDivisionCode())
                        .departmentName(division.getDepartmentName())
                        .ministryName(division.getMinistryName())
                        .build()
                ).collect(Collectors.toList());
    }

    public Division getDivisionById(long departmentId) {
        return divisionRepo.findById(departmentId).get();
    }

    public Object getDivisionById_V2(long departmentId) {
        Division division = divisionRepo.findById(departmentId).get();
        DivisionDTO divisionDTO = new DivisionDTO();
        divisionDTO.setDivisionName(division.getDivisionName());
        divisionDTO.setDivisionCode(division.getDivisionCode());
        divisionDTO.setId(division.getId());
        return divisionDTO;
    }
}
