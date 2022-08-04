package com.dh.grup8.IntegradorBackend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ProductReduxDtoParaScore {

    private Long id;
    @Schema(example = "House", required = true)
    @NotBlank(message = "Name can't be blank")
    private String name;
    private CategoryReduxDto category;
    private String address;
    private Double averageScore;

    public ProductReduxDtoParaScore() {
    }
}
