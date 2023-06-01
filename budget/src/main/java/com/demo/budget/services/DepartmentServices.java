package com.demo.budget.services;

import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DAOmodel.Ministry;
import com.demo.budget.DTO.DepartmentDTO;
import com.demo.budget.repository.DepartmentRepo;
import com.demo.budget.repository.DivisionRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentServices {

    @Autowired
    private MinistryService ministryService;

    @Autowired
    HttpServletRequest request;

    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    private DivisionRepo divisionRepo;

    public Department addDepartment(DepartmentDTO departmentDTO) {
        ModelMapper mapper = new ModelMapper();
        Department department = mapper.map(departmentDTO, Department.class);
        Ministry ministry = ministryService.findMinistryByEmail(request.getUserPrincipal().getName()).get();
        department.setMinistry(ministry);
        department.setMinistryName(ministry.getName());
        departmentRepo.save(department);
        return department;
    }

    public List<Department> getAllDepartments() {
        return departmentRepo.findAll();
    }

    public List<DepartmentDTO> getDepartmentByMinistry(String email) {
        email =request.getUserPrincipal().getName();
         List<Department> ministryDepartments = departmentRepo.getDepartmentsByMinistry(email);
         return ministryDepartments.stream()
                 .map(department -> DepartmentDTO.builder()
                         .id(department.getDepartment_id())
                         .name(department.getName())
                         .ministryName(department.getMinistryName())
                         .description(department.getDescription())
                         .DivisionCount(divisionRepo.countDivisionInDepart(department.getDepartment_id()))
                         .build()
                 ).collect(Collectors.toList());

    }

    public Object getDepartmentInfo(Long departmentId) {
        Department department = departmentRepo.findById(departmentId).get();
        ModelMapper mapper = new ModelMapper();
        DepartmentDTO departmentDTO = new DepartmentDTO();
        departmentDTO.setName(department.getName());
        departmentDTO.setMinistryName(department.getMinistryName());
        departmentDTO.setDescription(department.getDescription());
        departmentDTO.setCreated_at(department.getCreated_at());
        departmentDTO.setId(department.getDepartment_id());
        departmentDTO.setDivisionCount(divisionRepo.countDivisionInDepart(department.getDepartment_id()));
        return departmentDTO;
    }
}
