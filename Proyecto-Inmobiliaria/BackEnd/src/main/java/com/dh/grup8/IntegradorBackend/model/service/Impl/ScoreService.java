package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.ProductDto;
import com.dh.grup8.IntegradorBackend.model.dto.ScoreDto;
import com.dh.grup8.IntegradorBackend.model.entity.Product;
import com.dh.grup8.IntegradorBackend.model.entity.Score;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IScoreRepository;
import com.dh.grup8.IntegradorBackend.model.service.IScoreService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScoreService implements IScoreService {

    @Autowired
    IScoreRepository scoreRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public ScoreDto findById(Long id) throws ResourceNotFoundException {
        Optional<Score> score =scoreRepository.findById(id);
        if (score.isPresent()){
            return modelMapper.map(score, ScoreDto.class);
        }
        throw new ResourceNotFoundException("The score with ID: "+ id + " does not exist");
    }

    @Override
    public ScoreDto create(ScoreDto scoreDto) {
        Score score = scoreRepository.save(mapToEntity(scoreDto));
        return mapToDTO(score);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Score> score =scoreRepository.findById(id);
        if (!score.isPresent()){
            throw new ResourceNotFoundException("The score with ID "+ id +" that you want delete does not exists.");
        }
        scoreRepository.deleteById(id);
    }

    @Override
    public ScoreDto update(ScoreDto scoreDto) throws ResourceNotFoundException {
        Score score = mapToEntity(scoreDto);
        if (scoreRepository.existsById(score.getId())){
            return mapToDTO(scoreRepository.saveAndFlush(score));
        }
        throw new ResourceNotFoundException("The score with ID "+ score.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<ScoreDto> findAll() {
        List<Score> scores = scoreRepository.findAll();
        Set<ScoreDto> scoreDtoSet = new HashSet<>();
        for (Score score : scores) {
            scoreDtoSet.add(mapToDTO(score));
        }
        return scoreDtoSet;
    }

    public Double findAverageScore(Long id){
        Double score = scoreRepository.findAverageScore(id);
        return score;
    }

    @Override
    public ArrayList<ProductDto> findProductsFavoritesByUserId(Long id) {
        ArrayList<Product> products = scoreRepository.findProductsFavoritesByUserId(id);
        ArrayList<ProductDto> productDtos = new ArrayList<>();
        for (Product product : products) {
            product.setAverageScore(scoreRepository.findAverageScore(product.getId()));
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            productDtos.add(productDto);
        }
        return productDtos;
    }

    @Override
    public ArrayList<ScoreDto> findScoresFavoritesByUserId(Long id) {
        List<ScoreDto> scoreDtos = new ArrayList<>();
        scoreRepository.findScoresFavoritesByUserId(id)
                .stream()
                .forEach(score -> scoreDtos.add(mapToDTO(score)));
        return (ArrayList<ScoreDto>) scoreDtos;
    }

    //------ MAPPER ------
    private ScoreDto mapToDTO(Score score) {
        ScoreDto scoreDto = modelMapper.map(score, ScoreDto.class);
        return scoreDto;
    }

    private Score mapToEntity(ScoreDto scoreDto) {
        Score score = modelMapper.map(scoreDto, Score.class);
        return score;
    }
}
