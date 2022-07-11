package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.CitiesDTO;
import com.dh.grup8.IntegradorBackend.model.entity.Cities;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.ICitiesRepository;
import com.dh.grup8.IntegradorBackend.model.service.ICitiesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@Service
public class CitiesService implements ICitiesService {

    @Autowired
    ICitiesRepository citiesRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public CitiesDTO findById(Long id) throws ResourceNotFoundException {
        Optional<Cities> cities = citiesRepository.findById(id);
        if (cities.isPresent()){
            return modelMapper.map(cities, CitiesDTO.class);
        }
        throw new ResourceNotFoundException("The city with ID: "+ id + " does not exist");
    }

    @Override
    public CitiesDTO create(CitiesDTO citiesDTO) {
        Cities citiesSaveResponse = citiesRepository.save(mapToEntity(citiesDTO));
        CitiesDTO responseCitiesDTO = mapToDTO(citiesSaveResponse);
        return responseCitiesDTO;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Cities> cities =citiesRepository.findById(id);
        if (!cities.isPresent()){
            throw new ResourceNotFoundException("The city with ID "+ id +" that you want delete does not exists.");
        }
        citiesRepository.deleteById(id);

    }

    @Override
    public CitiesDTO update(CitiesDTO citiesDTO) throws ResourceNotFoundException {
        Cities cities = mapToEntity(citiesDTO);
        if (citiesRepository.existsById(cities.getId())){
            return mapToDTO(citiesRepository.save(cities));
        }
        throw new ResourceNotFoundException("The city with ID "+ cities.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<CitiesDTO> findAll() {
        List<Cities> cities_list = citiesRepository.findAll();
        Set<CitiesDTO> citiesDTO_list = new HashSet<>();
        for (Cities cat : cities_list) {
            citiesDTO_list.add(mapToDTO(cat));
        }
        return citiesDTO_list;
    }

    //------ MAPPER ------
    private CitiesDTO mapToDTO(Cities cities) {
        CitiesDTO citiesDTO = modelMapper.map(cities, CitiesDTO.class);
        return citiesDTO;
    }

    private Cities mapToEntity(CitiesDTO citiesDTO) {
        Cities cities = modelMapper.map(citiesDTO, Cities.class);
        return cities;
    }
}
