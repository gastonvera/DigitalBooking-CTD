package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.exceptions.ResourceNotFoundException;
import com.dh.grup8.IntegradorBackend.model.dto.ScoreDto;
import com.dh.grup8.IntegradorBackend.model.service.Impl.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/score")
public class ScoreController {

    @Autowired
    ScoreService scoreService;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> search(@Valid @RequestBody ScoreDto scoreDto) {
        ScoreDto responseDto = scoreService.create(scoreDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{scoreID}")
    public ResponseEntity<?> findByID(@PathVariable Long scoreID )throws ResourceNotFoundException {
        ScoreDto scoreDto = scoreService.findById(scoreID);
        return new ResponseEntity<>(scoreDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll() {
        Set<ScoreDto> scoreDtoSet = scoreService.findAll();
        return new ResponseEntity<>(scoreDtoSet, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ScoreDto scoreDto) throws ResourceNotFoundException {
        try {
            scoreService.update(scoreDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{scoreID}")
    public ResponseEntity<?> delete(@PathVariable Long scoreID) throws ResourceNotFoundException {
        scoreService.deleteById(scoreID);
        return new ResponseEntity<>("Score delete complete", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/average/{scoreID}")
    public ResponseEntity<?> findAverageById(@PathVariable Long scoreID )throws ResourceNotFoundException {
        Double scoreAverage = scoreService.findAverageScore(scoreID);
        return new ResponseEntity<>(scoreAverage, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/favorites/{userID}")
    public ResponseEntity<?> findProductsFavoritesByUserId(@PathVariable Long userID){
        return new ResponseEntity<>(scoreService.findProductsFavoritesByUserId(userID), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/favorites/user/{scoreID}")
    public ResponseEntity<?> findScoresFavorites(@PathVariable Long scoreID) {
        return new ResponseEntity<>(scoreService.findScoresFavoritesByUserId(scoreID), HttpStatus.OK);
    }




}
