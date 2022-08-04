package com.dh.grup8.IntegradorBackend.model.dto;


import javax.persistence.*;

public class RolesDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

}
