package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryReduxDto {

    private Long id;
    private String title;
    private String description;

    public CategoryReduxDto() {
    }
}
