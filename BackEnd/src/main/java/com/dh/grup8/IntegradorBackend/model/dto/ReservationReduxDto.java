package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationReduxDto {

    private LocalDate startDate;
    private  LocalDate endDate;

    public ReservationReduxDto() {
    }
}
