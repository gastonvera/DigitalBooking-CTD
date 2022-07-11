package com.dh.grup8.IntegradorBackend.security.dto;

import com.dh.grup8.IntegradorBackend.model.dto.ReservationForUserDto;
import com.dh.grup8.IntegradorBackend.model.dto.ScoreForUserDto;
import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private String lastName;
    private String password;
    private String token;
    private Rol rol;
    private Set<ReservationForUserDto> reservations;
    private Set<ScoreForUserDto> scores;

    public UserDto() {
    }
}
