package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.ImagesDto;
import com.dh.grup8.IntegradorBackend.model.entity.Image;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.repository.IImageRepository;
import com.dh.grup8.IntegradorBackend.model.service.IImageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ImageService implements IImageService {

    @Autowired
    IImageRepository iImageRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public ImagesDto findById(Long id) throws ResourceNotFoundException {
        Optional<Image> image =iImageRepository.findById(id);
        if (image.isPresent()){
            return modelMapper.map(image, ImagesDto.class);
        }
        throw new ResourceNotFoundException("The image with ID: "+ id + " does not exist");
    }

    @Override
    public ImagesDto create(ImagesDto imagesDto) {
        Image imageSaveResponse = iImageRepository.save(mapToEntity(imagesDto));
        return mapToDTO(imageSaveResponse);

    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Image> image =iImageRepository.findById(id);
        if (!image.isPresent()){
            throw new ResourceNotFoundException("The image with ID "+ id +" that you want delete does not exists.");
        }
        iImageRepository.deleteById(id);
    }

    @Override
    public ImagesDto update(ImagesDto imagesDto) throws ResourceNotFoundException {
        Image image = mapToEntity(imagesDto);
        if (iImageRepository.existsById(image.getId())){
            return mapToDTO(iImageRepository.save(image));
        }
        throw new ResourceNotFoundException("The product with ID "+ image.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<ImagesDto> findAll() {
        List<Image> images = iImageRepository.findAll();
        Set<ImagesDto> imagesDtoSet = new HashSet<>();
        for (Image image : images) {
            imagesDtoSet.add(mapToDTO(image));
        }
        return imagesDtoSet;
    }

    //------ MAPPER ------
    private ImagesDto mapToDTO(Image image) {
        ImagesDto imagesDto = modelMapper.map(image, ImagesDto.class);
        return imagesDto;
    }

    private Image mapToEntity(ImagesDto imagesDto) {
        Image image = modelMapper.map(imagesDto, Image.class);
        return image;
    }
}
