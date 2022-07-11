package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagesDto {

    private Long id;
    private String title;
    private String url;

    public ImagesDto() {
    }
}
