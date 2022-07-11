package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeaturesDTO {


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

    public FeaturesDTO(){}


}
