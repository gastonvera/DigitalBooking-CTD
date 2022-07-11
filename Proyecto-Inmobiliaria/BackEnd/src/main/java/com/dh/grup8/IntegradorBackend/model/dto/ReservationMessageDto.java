package com.dh.grup8.IntegradorBackend.model.dto;


import com.dh.grup8.IntegradorBackend.model.entity.Reservation;
import com.dh.grup8.IntegradorBackend.security.dto.UserIdDto;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter

public class ReservationMessageDto {

    private Long id;
    private UserIdDto user;
    private String body;
    private Boolean isUser;
    private ReservationIdDto reservation;
}
