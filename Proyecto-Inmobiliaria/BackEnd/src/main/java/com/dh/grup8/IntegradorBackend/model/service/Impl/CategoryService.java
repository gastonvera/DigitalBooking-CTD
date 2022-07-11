package com.dh.grup8.IntegradorBackend.model.service.Impl;


import com.dh.grup8.IntegradorBackend.model.dto.CategoryDTO;
import com.dh.grup8.IntegradorBackend.model.entity.Category;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.ICategoryRepository;
import com.dh.grup8.IntegradorBackend.model.service.ICategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    ICategoryRepository categoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public CategoryDTO findById(Long id) throws ResourceNotFoundException {
        Optional<Category> category =categoryRepository.findById(id);
        if (category.isPresent()){
            return modelMapper.map(category, CategoryDTO.class);
        }
        throw new ResourceNotFoundException("The category with ID: "+ id + " does not exist");
    }

    @Override
    public CategoryDTO create(CategoryDTO categoryDTO) {
        Category categorySaveResponse = categoryRepository.save(mapToEntity(categoryDTO));
        CategoryDTO responseCategoryDTO = mapToDTO(categorySaveResponse);
        return responseCategoryDTO;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Category> category =categoryRepository.findById(id);
        if (!category.isPresent()){
            throw new ResourceNotFoundException("The category with ID "+ id +" that you want delete does not exists.");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO)throws ResourceNotFoundException {
        Category category = mapToEntity(categoryDTO);
        if (categoryRepository.existsById(category.getId())){
            return mapToDTO(categoryRepository.save(category));
        }
       throw new ResourceNotFoundException("The category with ID "+ category.getId() +" that you want update does not exists.");
    }

//    @Override
//    public Set<CategoryDTO> findAll() {
//        List<Category> category_list = categoryRepository.findAll();
//        Set<CategoryDTO> categoryDTO_list = new HashSet<>();
//        for (Category cat : category_list) {
//            categoryDTO_list.add(mapToDTO(cat));
//        }
//        return categoryDTO_list;
//    }


    @Override
    public Set<CategoryDTO> findAll() {
        Set<CategoryDTO> categoryDTOS = new HashSet<>();
        categoryRepository.findAll()
                .stream()
                .forEach(category -> categoryDTOS.add(mapToDTO(category)));
        return categoryDTOS;
    }


    @Override
    public Long countByTitle(String title) {
        return categoryRepository.countByTitle(title);
    }

    //------ MAPPER ------
    private CategoryDTO mapToDTO(Category category) {
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
        return categoryDTO;
    }

    private Category mapToEntity(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        return category;
    }
}
