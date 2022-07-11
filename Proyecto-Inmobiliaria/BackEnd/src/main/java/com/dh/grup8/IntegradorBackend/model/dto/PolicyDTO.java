package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class PolicyDTO {

    private Long id;
    private ArrayList houseRules;
    private ArrayList healthAndSecurity;
    private ArrayList cancelPolicy;

    public PolicyDTO(){}
}
