package com.dh.grup8.IntegradorBackend.model.dto;

import com.dh.grup8.IntegradorBackend.model.entity.Features;
import com.dh.grup8.IntegradorBackend.model.entity.Image;
import com.dh.grup8.IntegradorBackend.model.entity.Policy;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Set;

@Getter
@Setter
public class ProductForReservationDto {
    private Long id;
    @Schema(example = "House", required = true)
    @NotBlank(message = "Name can't be blank")
    private String name;
    private ArrayList<String> description;
    private CategoryReduxDto category;
    private Features features;
    private Policy policy;
    private Set<Image> images;
    private CitiesReduxDto cities;
    private Set<ScoreDtoRedux> scores;
    private Double averageScore;
    private String address;
    private Integer pricePerNight;
}
