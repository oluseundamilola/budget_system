package com.demo.budget.controller;

import com.demo.budget.DAOmodel.Ministry;
import com.demo.budget.DTO.MinistryDTO;
import com.demo.budget.services.MinistryService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/ministry")
public class MinistryController {
    @Autowired
    private MinistryService ministryService;
    @Autowired
    private HttpServletRequest request; //This here is to get the Email of the person loggedIn in system.





    //Only ADMIN can do this. Login as Admin and pass the token in HEADER of request
    @PostMapping(path = "add_ministry")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addMinistry(@RequestBody MinistryDTO ministry) {
        return ministryService.addMinistry(ministry);
    }


    //Get all Ministry only ADMIN can do this
    @GetMapping(path = "get_ministry")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_APPROVER')")
    public List<MinistryDTO> getAllMinistries() {
        return ministryService.getAllMinistries();
    }


    @PutMapping(path = "update_ministry/{id}")
    public ResponseEntity<Ministry> updateMinistry(@PathVariable("id") Long id, @RequestBody MinistryDTO ministryDTO) throws ChangeSetPersister.NotFoundException {
        Ministry ministry = ministryService.updateMinistry(id, ministryDTO);
        return ResponseEntity.ok(ministry);
    }

    @DeleteMapping(path = "delete_ministry/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMinistry(@PathVariable Long id) {
        boolean deleted;
        deleted = ministryService.deleteMinistry(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "ministry_info")
    public ResponseEntity<?> getMinistryInfo(){
        String email = request.getUserPrincipal().getName();
        return ResponseEntity.ok(ministryService.getMinistryInfo(email));
    }


//Test
//    @GetMapping(path = "email_test/{email}")
//    public ResponseEntity<?> findByEmail(@PathVariable String email) {
//        return ResponseEntity.ok(ministryService.findMinistryByEmail(email));
//    }


}
