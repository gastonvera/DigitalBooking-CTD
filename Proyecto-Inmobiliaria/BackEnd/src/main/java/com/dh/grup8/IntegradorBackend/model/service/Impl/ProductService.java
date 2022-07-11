package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.ProductDto;
import com.dh.grup8.IntegradorBackend.model.dto.ProductReduxDto;
import com.dh.grup8.IntegradorBackend.model.entity.Product;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IProductRepository;
import com.dh.grup8.IntegradorBackend.model.repository.IScoreRepository;
import com.dh.grup8.IntegradorBackend.model.service.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductService implements IProductService {

    @Autowired
    IProductRepository productRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    IScoreRepository scoreRepository;

    @Override
    public ProductDto findById(Long id) throws ResourceNotFoundException {
        Optional<Product> product =productRepository.findById(id);
        if (product.isPresent()){
            return modelMapper.map(product, ProductDto.class);
        }
        throw new ResourceNotFoundException("The product with ID: "+ id + " does not exist");
    }

    @Override
    public ProductDto create(ProductDto productDto) {
        Product productSaveResponse = productRepository.save(mapToEntity(productDto));
        ProductDto responseProductDto = mapToDTO(productSaveResponse);
        return responseProductDto;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Product> product =productRepository.findById(id);
        if (!product.isPresent()){
            throw new ResourceNotFoundException("The product with ID "+ id +" that you want delete does not exists.");
        }
        productRepository.deleteById(id);
    }

    @Override
    public ProductDto update(ProductDto productDto) throws ResourceNotFoundException {
        Product product = mapToEntity(productDto);
        if (productRepository.existsById(product.getId())){
            return mapToDTO(productRepository.save(product));
        }
        throw new ResourceNotFoundException("The product with ID "+ product.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<ProductDto> findAll() {
        List<Product> products = productRepository.findAll();
        Set<ProductDto> productDtoSet = new HashSet<>();
        for (Product pro : products) {
            pro.setAverageScore(scoreRepository.findAverageScore(pro.getId()));
            productDtoSet.add(mapToDTO(pro));
        }
        return productDtoSet;
    }

    @Override
    public List<ProductDto> findProductsByCityName(String name) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductsByCityName(name);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The city with name "+name +" that you want to filter does not exists.");
    }

    @Override
    public List<ProductDto> findProductsByCategory(Long id) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductsByCategory(id);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The category with category id "+ id +" that you want to filter is empty or does not exist.");
    }

    @Override
    public List<ProductDto> findProductByDateAndCity(String cityName, LocalDate start, LocalDate end) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductByDateAndCity(cityName, start, end);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The city with name "+ cityName +" that you want to filter is empty or does not exist.");
    }

    @Override
    public List<ProductDto> findProductByDate(LocalDate start, LocalDate end) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductByDate(start, end);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The date range that you want to filter is wrong or does not exist.");
    }

    @Override
    public List<ProductDto> findProductByDateAndCityAndCategory(Long categoryId, String cityName, LocalDate start, LocalDate end) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductByDateAndCityAndCategory(categoryId,cityName, start, end);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The city with name "+ cityName +" or the category with id "+categoryId+" that you want to filter is empty or does not exist or date range is wrong.");
    }

    @Override
    public List<ProductDto> findProductsByCategoryAndCity(Long categoryId, String cityName) throws ResourceNotFoundException {
        List<ProductDto> productDtos = new ArrayList<>();
        List<Product> products = productRepository.findProductsByCategoryAndCity(categoryId, cityName);
        if (!products.isEmpty()){
            for (Product product : products) {
                product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productDtos.add(productDto);
            }
            return productDtos;
        }
        throw new ResourceNotFoundException("The city with name "+ cityName +" or the category with id "+categoryId+" that you want to filter is empty or does not exist.");
    }

    //------ MAPPER ------
    private ProductDto mapToDTO(Product product) {
        ProductDto productDto = modelMapper.map(product, ProductDto.class);
        return productDto;
    }

    private Product mapToEntity(ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        return product;
    }


}
