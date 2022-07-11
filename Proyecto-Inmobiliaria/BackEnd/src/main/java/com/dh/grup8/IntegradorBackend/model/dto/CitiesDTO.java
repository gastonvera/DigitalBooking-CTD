package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter

public class CitiesDTO {

    private Long id;
    private String name;
    private String province;
    private String country;
    private Set<ProductReduxDto> products;

    public CitiesDTO() {
    }
}
