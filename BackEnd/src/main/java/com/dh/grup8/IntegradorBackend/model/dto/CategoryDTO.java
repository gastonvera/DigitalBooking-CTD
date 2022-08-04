package com.dh.grup8.IntegradorBackend.model.dto;

import javax.validation.constraints.NotBlank;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CategoryDTO {

    private Long id;
    @Schema(example = "Deptos", required = true)
    @NotBlank(message = "Title can't be blank")
    private String title;
    @Schema(example = "Default description from the category", required = true)
    @NotBlank(message = "Description can't be blank")
    private String description;
    @Schema(example = "https://server.com/depto_cancun.jpg", required = true)
    @NotBlank(message = "ImageURL can't be blank")
    private String urlImage;
    private Set<ProductReduxDto> products;

    public CategoryDTO() {
    }
}
