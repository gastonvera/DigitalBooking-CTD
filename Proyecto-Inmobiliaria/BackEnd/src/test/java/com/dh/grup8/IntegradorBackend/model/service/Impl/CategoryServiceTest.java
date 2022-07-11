package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.CategoryDTO;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/*El Lifecycle.PER_CLASS permite pedir a JUnit crear solo una instancia de la clase a testear y reutilizarla en los diferentes test.
De no declarar el Lifecycle PER_CLASS, tendreiamos que hacer la funcion BeforeAll o BeforeEach static al instanciar una clase.*/
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest
class CategoryServiceTest {

    private CategoryDTO categoryDTO;

    @Autowired
    CategoryService categoryService;

    @BeforeEach
    public void prepararTest() {
        categoryDTO = new CategoryDTO();
        categoryDTO.setId(1L);
        categoryDTO.setTitle("Title Test");
        categoryDTO.setDescription("Description Test");
        categoryDTO.setUrlImage("UrlImage Test");
        categoryService.create(categoryDTO);
    }

    @Test
    void findById() throws ResourceNotFoundException {
        assertNotNull(categoryService.findById(categoryDTO.getId()));
    }

    @Test
    void create() {
        CategoryDTO categoryDTOTest = new CategoryDTO();
        {
            categoryDTOTest.setTitle("Title Test Method create");
            categoryDTOTest.setDescription("Description Test Method create");
            categoryDTOTest.setUrlImage("UrlImage Test Method create");
        }
        assertNotNull(categoryService.create(categoryDTOTest));
    }

    /*
    @Test
    void deleteById() throws ResourceNotFoundException {
        Long idToSearch = categoryDTO.getId();
        categoryService.deleteById(idToSearch);
        assertTrue(categoryService.findAll().size() > 0);
    }
     */

    @Test
    void update() throws ResourceNotFoundException {
        categoryDTO.setTitle("Title change to Test");
        CategoryDTO updatedCategory = categoryService.update(categoryDTO);
        assertEquals("Title change to Test", updatedCategory.getTitle());
        assertEquals("Title change to Test", categoryService.findById(updatedCategory.getId()).getTitle());
    }

    @Test
    void findAll() {
        Set<CategoryDTO> categoryDTO_list = categoryService.findAll();
        assertTrue(categoryDTO_list.size() > 0);
    }
}