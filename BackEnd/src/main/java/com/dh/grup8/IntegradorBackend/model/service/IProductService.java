package com.dh.grup8.IntegradorBackend.model.service;


import com.dh.grup8.IntegradorBackend.model.dto.ProductDto;
import com.dh.grup8.IntegradorBackend.exceptions.*;


import java.time.LocalDate;
import java.util.List;

public interface IProductService extends ICRUDService<ProductDto>{

    List<ProductDto> findProductsByCityName(String name) throws ResourceNotFoundException;

    List<ProductDto> findProductsByCategory(Long id) throws ResourceNotFoundException;

    List<ProductDto> findProductByDateAndCity(String cityName, LocalDate start, LocalDate end) throws ResourceNotFoundException;

    List<ProductDto> findProductByDate(LocalDate start, LocalDate end) throws ResourceNotFoundException;

    List<ProductDto> findProductByDateAndCityAndCategory(Long categoryId, String cityName, LocalDate start, LocalDate end) throws ResourceNotFoundException;

    List<ProductDto> findProductsByCategoryAndCity(Long categoryId, String cityName) throws ResourceNotFoundException;
}
