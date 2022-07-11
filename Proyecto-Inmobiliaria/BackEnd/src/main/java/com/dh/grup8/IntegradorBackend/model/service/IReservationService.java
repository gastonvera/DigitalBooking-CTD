package com.dh.grup8.IntegradorBackend.model.service;

import com.dh.grup8.IntegradorBackend.model.dto.ReservationDto;
import com.dh.grup8.IntegradorBackend.exceptions.*;

import java.util.List;

public interface IReservationService extends ICRUDService<ReservationDto>{

    List<ReservationDto> findReservationByProductId(Long id) throws ResourceNotFoundException;

    List<ReservationDto> findReservationsByUserId(Long id) throws ResourceNotFoundException;

}
