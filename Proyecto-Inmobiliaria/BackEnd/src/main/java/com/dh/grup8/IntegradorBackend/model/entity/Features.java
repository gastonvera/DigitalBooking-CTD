package com.dh.grup8.IntegradorBackend.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Features {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean pool;
    private boolean grill;
    private boolean security;
    private boolean elevator;
    private boolean airConditioning;
    private boolean gym;
    private boolean laundry;
    private boolean sauna;
    private boolean suitableProfessional;
    private boolean disabledAccess;
    private boolean furnished;
    private boolean bright;
    private boolean pets;
    private boolean comercialUse;
    private boolean electricity;
    private boolean naturalGas;
    private boolean water;
    private boolean heating;
    private boolean wifi;

}
