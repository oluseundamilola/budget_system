//package com.demo.budget.DAOmodel;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotNull;
//import lombok.Data;
//
//@Entity
//@Data
//@Table(name = "request_list")
//public class RequestList {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long request_id;
//    private String name;
//    private String description;
//    private String sentAt;
//    private Boolean approved;
//
//    @NotNull
//    @ManyToOne
//    @JoinColumn(name = "approver_id", referencedColumnName = "approver_id", nullable = false)
//    private Approver approver;
//}
