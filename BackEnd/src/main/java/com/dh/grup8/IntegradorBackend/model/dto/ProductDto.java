package com.dh.grup8.IntegradorBackend.model.dto;

import com.dh.grup8.IntegradorBackend.model.entity.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Set;

@Getter
@Setter
public class ProductDto {

    private Long id;
    @Schema(example = "House", required = true)
    @NotBlank(message = "Name can't be blank")
    private String name;
    private ArrayList<String> description;
    private String referencias;
    private CategoryReduxDto category;
    private Features features;
    private Set<Image> images;
    private CitiesReduxDto cities;
    private Policy policy;
    private Set<ScoreDtoRedux> scores;
    private Set<ReservationReduxDto> reservations;
    private Double latitude;
    private Double longitude;
    private Double averageScore;
    private String address;
    private ArrayList checkInRange_list;
    private Integer pricePerNight;

    public ProductDto() {

    }
}
