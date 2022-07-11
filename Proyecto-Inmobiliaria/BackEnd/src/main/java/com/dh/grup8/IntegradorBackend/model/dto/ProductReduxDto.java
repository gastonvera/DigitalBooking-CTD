package com.dh.grup8.IntegradorBackend.model.dto;

import com.dh.grup8.IntegradorBackend.model.entity.Image;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Set;

@Getter
@Setter
public class ProductReduxDto {

    private Long id;
    @Schema(example = "House", required = true)
    @NotBlank(message = "Name can't be blank")
    private String name;
    @Schema(example = "Default description from the product", required = true)
    @NotBlank(message = "Description can't be blank")
    private ArrayList description;
//    private CategoryReduxDto category;
    private Set<Image> images;
    private Set<ScoreDtoRedux> scores;
    private Double averageScore;
    private String address;
    private ArrayList checkInRange_list;
    private Integer pricePerNight;

    public ProductReduxDto() {
    }
}
