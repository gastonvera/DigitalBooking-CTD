package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.exceptions.ResourceNotFoundException;
import com.dh.grup8.IntegradorBackend.model.dto.ReservationMessageDto;
import com.dh.grup8.IntegradorBackend.model.entity.Message;
import com.dh.grup8.IntegradorBackend.model.repository.IMessagesRepository;
import com.dh.grup8.IntegradorBackend.model.service.IReservationMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReservationMessageService implements IReservationMessageService {

    @Autowired
    IMessagesRepository messageRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public ReservationMessageDto findById(Long id) throws ResourceNotFoundException {
        Optional<Message> message =messageRepository.findById(id);
        if (message.isPresent()){
            return modelMapper.map(message, ReservationMessageDto.class);
        }
        throw new ResourceNotFoundException("The message with ID: "+ id + " does not exist");
    }

    @Override
    public ReservationMessageDto create(ReservationMessageDto reservationMessageDto) {
        Message message = messageRepository.save(mapToEntity(reservationMessageDto));
        ReservationMessageDto messageDto = mapToDTO(message);
        return messageDto;
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Message> message =messageRepository.findById(id);
        if (!message.isPresent()){
            throw new ResourceNotFoundException("The message with ID "+ id +" that you want delete does not exists.");
        }
        messageRepository.deleteById(id);
    }

    @Override
    public ReservationMessageDto update(ReservationMessageDto reservationMessageDto) throws ResourceNotFoundException {
        Message message = mapToEntity(reservationMessageDto);
        if (messageRepository.existsById(message.getId())){
            return mapToDTO(messageRepository.save(message));
        }
        throw new ResourceNotFoundException("The product with ID "+ message.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<ReservationMessageDto> findAll() {
        List<Message> messages = messageRepository.findAll();
        Set<ReservationMessageDto> messageDtoSet = new HashSet<>();
        for (Message message : messages) {
            messageDtoSet.add(mapToDTO(message));
        }
        return messageDtoSet;
    }

    //------ MAPPER ------
    private ReservationMessageDto mapToDTO(Message message) {
        ReservationMessageDto messageDto = modelMapper.map(message, ReservationMessageDto.class);
        return messageDto;
    }

    private Message mapToEntity(ReservationMessageDto messageDto) {
        Message message = modelMapper.map(messageDto, Message.class);
        return message;
    }
}
