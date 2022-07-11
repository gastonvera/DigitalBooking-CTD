package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.model.dto.CitiesDTO;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.service.Impl.CitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/city")
public class CitiesController {

    @Autowired
    CitiesService citiesService;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> search(@Valid @RequestBody CitiesDTO citiesDTO) {
        citiesService.create(citiesDTO);
        return new ResponseEntity<>(citiesDTO, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{citiesId}")
    public ResponseEntity<?> findByID(@PathVariable Long citiesId )throws ResourceNotFoundException {
        CitiesDTO citiesDTO = citiesService.findById(citiesId);
        return new ResponseEntity<>(citiesDTO, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll() {
        Set<CitiesDTO> citiesDTOSet = citiesService.findAll();
        return new ResponseEntity<>(citiesDTOSet, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody CitiesDTO citiesDTO) throws ResourceNotFoundException {
        citiesService.update(citiesDTO);
        return new ResponseEntity<>(citiesDTO, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{citiesID}")
    public ResponseEntity<?> delete(@PathVariable Long citiesID) throws ResourceNotFoundException {
        citiesService.deleteById(citiesID);
        return new ResponseEntity<>("Cities delete complete", HttpStatus.OK);
    }

}
