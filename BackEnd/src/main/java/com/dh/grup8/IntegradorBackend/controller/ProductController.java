package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.model.dto.ProductDto;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IScoreRepository;
import com.dh.grup8.IntegradorBackend.model.service.Impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;
    @Autowired
    IScoreRepository scoreRepository;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> create(@Valid @RequestBody ProductDto productDto) {
        productService.create(productDto);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{productoId}")
    public ResponseEntity<?> findByID(@PathVariable Long productoId) throws ResourceNotFoundException {
        ProductDto productDto = productService.findById(productoId);
        productDto.setAverageScore(scoreRepository.findAverageScore(productDto.getId()));
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll(){
        Set<ProductDto> productDtoSet=productService.findAll();
        return new ResponseEntity<>(productDtoSet, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ProductDto productDto) throws ResourceNotFoundException{
        productService.update(productDto);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{productoId}")
    public ResponseEntity<?> delete(@PathVariable Long productoId) throws ResourceNotFoundException{
        productService.deleteById(productoId);
        return new ResponseEntity<>("Product delete complete", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/city/{name}")
    public ResponseEntity<?> findProductsByCityName(@PathVariable String name) throws ResourceNotFoundException{
        List<ProductDto> productDtoList = productService.findProductsByCityName(name);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/category/{id}")
    public ResponseEntity<?> findProductsByCategory(@PathVariable Long id) throws ResourceNotFoundException{
        List<ProductDto> productDtoList = productService.findProductsByCategory(id);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/category/{id}/city/{name}")
    public ResponseEntity<?> findProductsByCategoryAndCity(@PathVariable Long id, @PathVariable String name) throws ResourceNotFoundException{
        List<ProductDto> productDtoList = productService.findProductsByCategoryAndCity(id, name);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/category/{id}/city/{name}/startDate/{start}/endDate/{end}")
    public ResponseEntity<?> findProductByDateAndCityAndCategory(@PathVariable Long id, @PathVariable String name, @PathVariable String start, @PathVariable String end) throws ResourceNotFoundException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        //convert String to LocalDate
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        List<ProductDto> productDtoList = productService.findProductByDateAndCityAndCategory(id, name, startDate, endDate);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/startDate/{start}/endDate/{end}")
    public ResponseEntity<?> findProductByDate(@PathVariable String start,@PathVariable String end) throws ResourceNotFoundException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        //convert String to LocalDate
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        List<ProductDto> productDtoList = productService.findProductByDate(startDate,endDate);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/city/{name}/startDate/{start}/endDate/{end}")
    public ResponseEntity<?> findProductByDateAndCity(@PathVariable String name, @PathVariable String start, @PathVariable String end) throws ResourceNotFoundException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        //convert String to LocalDate
        LocalDate startDate = LocalDate.parse(start, formatter);
        LocalDate endDate = LocalDate.parse(end, formatter);
        List<ProductDto> productDtoList = productService.findProductByDateAndCity(name, startDate, endDate);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

}
