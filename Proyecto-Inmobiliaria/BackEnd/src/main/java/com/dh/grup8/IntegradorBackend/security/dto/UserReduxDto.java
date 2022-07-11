package com.dh.grup8.IntegradorBackend.security.dto;

import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserReduxDto {

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String token;
    private Rol rol;

    public UserReduxDto() {
    }
}
