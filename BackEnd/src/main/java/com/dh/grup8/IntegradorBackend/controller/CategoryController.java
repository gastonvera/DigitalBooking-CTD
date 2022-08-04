package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.model.dto.CategoryDTO;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.service.Impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> search(@Valid @RequestBody CategoryDTO categoryDTO){
        categoryService.create(categoryDTO);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{categoryId}")
    public ResponseEntity<?> findByID(@PathVariable Long categoryId) throws ResourceNotFoundException {
        CategoryDTO categoryDTO = categoryService.findById(categoryId);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll(){
        Set<CategoryDTO> categoryDTOList=categoryService.findAll();
        return new ResponseEntity<>(categoryDTOList, HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody CategoryDTO categoryDTO) throws ResourceNotFoundException{
        categoryService.update(categoryDTO);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> delete(@PathVariable Long categoryId) throws ResourceNotFoundException{
        categoryService.deleteById(categoryId);
        return new ResponseEntity<>("Category delete complete", HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/count/{title}")
    public long countByTitle(@PathVariable String title) {
        return categoryService.countByTitle(title);
    }

}
