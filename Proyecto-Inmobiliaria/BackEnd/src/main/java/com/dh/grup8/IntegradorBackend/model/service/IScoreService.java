package com.dh.grup8.IntegradorBackend.model.service;

import com.dh.grup8.IntegradorBackend.model.dto.ProductDto;
import com.dh.grup8.IntegradorBackend.model.dto.ScoreDto;
import com.dh.grup8.IntegradorBackend.model.entity.Product;


import java.util.ArrayList;

public interface IScoreService extends ICRUDService<ScoreDto>{

    ArrayList<ProductDto> findProductsFavoritesByUserId(Long id);

    ArrayList<ScoreDto> findScoresFavoritesByUserId(Long id);
}
