package com.dh.grup8.IntegradorBackend.model.service;

import com.dh.grup8.IntegradorBackend.model.dto.CategoryDTO;

public interface ICategoryService extends ICRUDService<CategoryDTO> {

    Long countByTitle(String title);
}
