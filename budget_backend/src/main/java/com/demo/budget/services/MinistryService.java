package com.demo.budget.services;

import com.demo.budget.DAOmodel.Department;
import com.demo.budget.DAOmodel.Ministry;
import com.demo.budget.DAOmodel.Users;
import com.demo.budget.DTO.DepartmentDTO;
import com.demo.budget.DTO.MinistryDTO;
import com.demo.budget.repository.DepartmentRepo;
import com.demo.budget.repository.MinistryRepo;
import com.demo.budget.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MinistryService {

    String ministryLoginInEmail = "siji@gmail.com";

    private final MinistryRepo ministryRepo;

    private final UserRepo userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private DepartmentRepo departmentRepo;

    @Autowired
    public MinistryService(MinistryRepo ministryRepo, UserRepo userRepo) {
        this.ministryRepo = ministryRepo;
        this.userRepo = userRepo;
    }

    public ResponseEntity<?> addMinistry(MinistryDTO ministryDTO) {
        //check if user with email already exists
        Optional<Ministry> isMinistryByEmail = findMinistryByEmail(ministryDTO.getEmail());
        Optional<Ministry> isMinistryByName = findMinistryByName(ministryDTO.getName());
        if (!isMinistryByEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("Email already taken");
        }
        if (!isMinistryByName.isEmpty()) {
            return ResponseEntity.badRequest().body("Ministry with name already taken");
        }

        ModelMapper mapper = new ModelMapper();


        Ministry newMinistry = mapper.map(ministryDTO, Ministry.class);
        ministryRepo.save(newMinistry);

        Users userMinistry = mapper.map(ministryDTO, Users.class);
        userMinistry.setRole("ROLE_USER");
        userMinistry.setStatus("active");
        userMinistry.setMinistryID(newMinistry.getMinistry_id());
        userMinistry.setPassword(encoder.encode(userMinistry.getPassword()));
        userRepo.save(userMinistry);
        return ResponseEntity.ok(ministryDTO.getName() + " Added to system");


    }


    public Optional<Ministry> findMinistryByEmail(String email) {
        return ministryRepo.findOneByEmail(email);
    }

    public Optional<Ministry> findMinistryByName(String name) {
        return ministryRepo.findByName(name);
    }

    public List<MinistryDTO> getAllMinistries() {
        List<Ministry> ministries = ministryRepo.findAll();
        return ministries.stream()
                .map(ministry -> MinistryDTO.builder()
                        .id(ministry.getMinistry_id())
                        .name(ministry.getName())
                        .description(ministry.getDescription())
                        .location(ministry.getLocation())
                        .sector(ministry.getSector())
                        .email(ministry.getEmail())
                        .departmentCount(departmentRepo.countDepartmentInMinistry(ministry.getName()))
                        .build()

                ).collect(Collectors.toList());
    }

    public Ministry updateMinistry(Long ministry_id, MinistryDTO ministryDTO) throws ChangeSetPersister.NotFoundException {
        //find ministry to update by ID passed
        Optional<Ministry> existingMinistry = ministryRepo.findById(ministry_id);
        if (existingMinistry.isEmpty()) {
            throw new ChangeSetPersister.NotFoundException();
        }

        Ministry ministryToUpdate = existingMinistry.get();

        ministryToUpdate.setName(ministryDTO.getName());
        ministryToUpdate.setDescription(ministryDTO.getDescription());
        ministryToUpdate.setLocation(ministryDTO.getLocation());
        ministryToUpdate.setSector(ministryDTO.getSector());

        return ministryRepo.save(ministryToUpdate);
    }

    public boolean deleteMinistry(Long id) {
        Optional<Ministry> existingMinistry = ministryRepo.findById(id);
        if (!existingMinistry.isPresent()) {
            return false;
        }
        ministryRepo.deleteById(id);
        return true;
    }

    public MinistryDTO getMinistryInfo(String email) {
        Optional<Ministry> exisitingMinistry = ministryRepo.findOneByEmail(email);
        Ministry ministry = new Ministry();
        if(exisitingMinistry.isPresent()){
             ministry = exisitingMinistry.get();
        }
        ModelMapper mapper = new ModelMapper();
        MinistryDTO ministryDTO = mapper.map(ministry, MinistryDTO.class);
        ministryDTO.setDepartmentCount(departmentRepo.countDepartmentInMinistry(ministry.getName()));
        return ministryDTO;
    }


}
