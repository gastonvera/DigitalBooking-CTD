package com.dh.grup8.IntegradorBackend.model.service.Impl;

import com.dh.grup8.IntegradorBackend.model.dto.ProductReduxDto;
import com.dh.grup8.IntegradorBackend.model.dto.ReservationDto;
import com.dh.grup8.IntegradorBackend.exceptions.*;
import com.dh.grup8.IntegradorBackend.model.entity.Product;
import com.dh.grup8.IntegradorBackend.model.entity.Reservation;
import com.dh.grup8.IntegradorBackend.model.repository.IReservationRepository;
import com.dh.grup8.IntegradorBackend.model.repository.IScoreRepository;
import com.dh.grup8.IntegradorBackend.model.service.IReservationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReservationService implements IReservationService {

    @Autowired
    IReservationRepository reservationRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    IScoreRepository scoreRepository;

    @Override
    public ReservationDto findById(Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation =reservationRepository.findById(id);
        if (reservation.isPresent()){
            return modelMapper.map(reservation, ReservationDto.class);
        }
        throw new ResourceNotFoundException("The product with ID: "+ id + " does not exist");
    }

    @Override
    public ReservationDto create(ReservationDto reservationDto) {
        Reservation reservation = reservationRepository.save(mapToEntity(reservationDto));
        return mapToDTO(reservation);
    }

    @Override
    public void deleteById(Long id) throws ResourceNotFoundException {
        Optional<Reservation> reservation=reservationRepository.findById(id);
        if (!reservation.isPresent()){
            throw new ResourceNotFoundException("The reservation with ID "+ id +" that you want delete does not exists.");
        }
        reservationRepository.deleteById(id);
    }

    @Override
    public ReservationDto update(ReservationDto reservationDto) throws ResourceNotFoundException {
        Reservation reservation = mapToEntity(reservationDto);
        if (reservationRepository.existsById(reservation.getId())){
            return mapToDTO(reservationRepository.save(reservation));
        }
        throw new ResourceNotFoundException("The reservation with ID "+ reservation.getId() +" that you want update does not exists.");
    }

    @Override
    public Set<ReservationDto> findAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        Set<ReservationDto> reservationDtoSet = new HashSet<>();
        for (Reservation reservation : reservations) {
            reservationDtoSet.add(mapToDTO(reservation));
        }
        return reservationDtoSet;
    }

    //------ MAPPER ------
    private ReservationDto mapToDTO(Reservation reservation) {
        ReservationDto reservationDto = modelMapper.map(reservation, ReservationDto.class);
        return reservationDto;
    }

    private Reservation mapToEntity(ReservationDto reservationDto) {
        Reservation reservation = modelMapper.map(reservationDto, Reservation.class);
        return reservation;
    }

    @Override
    public List<ReservationDto> findReservationByProductId(Long id) throws ResourceNotFoundException {
        List<ReservationDto> reservationDtos = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findReservationByProductId(id);
        if (!reservations.isEmpty()){
            for (Reservation reservation : reservations) {
                ReservationDto reservationDto = modelMapper.map(reservation, ReservationDto.class);
                reservationDtos.add(reservationDto);
            }
            return reservationDtos;
        }
        throw new ResourceNotFoundException("The product with id "+ id +" that you want to filter is empty or does not exist.");
    }


    @Override
    public List<ReservationDto> findReservationsByUserId(Long id) throws ResourceNotFoundException {
        List<ReservationDto> reservationDtos = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findReservationsByUserId(id);
        if (!reservations.isEmpty()){
            for (Reservation reservation : reservations) {
                reservation.getProduct().setAverageScore(scoreRepository.findAverageScore(reservation.getProduct().getId()));
                ReservationDto reservationDto = modelMapper.map(reservation, ReservationDto.class);
                reservationDtos.add(reservationDto);
            }
            return reservationDtos;
        }
        throw new ResourceNotFoundException("The client with id "+ id +" that you want to filter is empty or does not exist.");
    }
}
