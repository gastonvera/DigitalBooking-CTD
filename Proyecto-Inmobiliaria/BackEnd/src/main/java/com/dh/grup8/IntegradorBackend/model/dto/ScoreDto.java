package com.dh.grup8.IntegradorBackend.model.dto;

import com.dh.grup8.IntegradorBackend.security.dto.UserReduxDto;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;


@Getter
@Setter
public class ScoreDto {


    private Long id;
    private ProductReduxDtoParaScore product;
    @Max(value =5)
    @Min(value = 0)
    private Integer score;
    private boolean favorite;
    private UserReduxDto user;

    public ScoreDto() {
    }

}
