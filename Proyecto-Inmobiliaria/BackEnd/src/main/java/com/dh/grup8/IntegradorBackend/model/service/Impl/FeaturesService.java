package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.FeaturesDTO;
import com.dh.grup8.IntegradorBackend.model.entity.Features;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IFeaturesRepository;
import com.dh.grup8.IntegradorBackend.model.service.IFeaturesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FeaturesService implements IFeaturesService {

    @Autowired
    IFeaturesRepository featuresRepository;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public FeaturesDTO findById(Long id) throws ResourceNotFoundException {
        Optional<Features> features = featuresRepository.findById(id);
        if (features.isPresent()) {
            return modelMapper.map(features, FeaturesDTO.class);
        }
        throw new ResourceNotFoundException("The Features does not exist");
    }

    @Override
    public FeaturesDTO create(FeaturesDTO featuresDTO) {
        Features featuresSaveResponse = featuresRepository.save(mapToEntity(featuresDTO));
        FeaturesDTO responseFeatureDTO = mapToDTO(featuresSaveResponse);
        return responseFeatureDTO;
    }

    //
    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Features> features = featuresRepository.findById(id);
        if (!features.isPresent()) {
            throw new ResourceNotFoundException("The features with ID " + id + " that you want delete does not exists.");
        }
        featuresRepository.deleteById(id);
    }

    @Override
    public FeaturesDTO update(FeaturesDTO featuresDTO) throws ResourceNotFoundException {
        Features features = mapToEntity(featuresDTO);
        if (featuresRepository.existsById(features.getId())) {
            return mapToDTO(featuresRepository.save(features));
        }
        throw new ResourceNotFoundException("The features with ID " + features.getId() + " that you want update does not exists.");
    }

    @Override
    public Set<FeaturesDTO> findAll() {
        List<Features> features_list = featuresRepository.findAll();
        Set<FeaturesDTO> featuresDTO_list = new HashSet<>();
        for (Features fea : features_list) {
            featuresDTO_list.add(mapToDTO(fea));
        }
        return featuresDTO_list;
    }

    //------ MAPPER ------
    private FeaturesDTO mapToDTO(Features features) {
        FeaturesDTO featuresDTO = modelMapper.map(features, FeaturesDTO.class);
        return featuresDTO;
    }

    private Features mapToEntity(FeaturesDTO featuresDTO) {
        Features features = modelMapper.map(featuresDTO, Features.class);
        return features;
    }
}
