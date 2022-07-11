package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.model.dto.ImagesDto;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.service.Impl.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageController {

    @Autowired
    ImageService imageService;
    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> search(@Valid @RequestBody ImagesDto imageDto) {
        imageService.create(imageDto);
        return new ResponseEntity<>(imageDto, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/id/{imageId}")
    public ResponseEntity<?> findByID(@PathVariable Long imageID) throws ResourceNotFoundException {
        ImagesDto imageDto = imageService.findById(imageID);
        return new ResponseEntity<>(imageDto, HttpStatus.OK);
    }
    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll() {
        Set<ImagesDto> imageDtoSet = imageService.findAll();
        return new ResponseEntity<>(imageDtoSet, HttpStatus.OK);
    }
    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ImagesDto imageDto) throws ResourceNotFoundException {
        imageService.update(imageDto);
        return new ResponseEntity<>(imageDto, HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/delete/{imageID}")
    public ResponseEntity<?> delete(@PathVariable Long imageID) throws ResourceNotFoundException {
        imageService.deleteById(imageID);
        return new ResponseEntity<>("Image delete complete", HttpStatus.OK);
    }

}
