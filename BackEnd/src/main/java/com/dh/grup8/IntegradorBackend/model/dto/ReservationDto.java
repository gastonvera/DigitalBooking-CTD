package com.dh.grup8.IntegradorBackend.model.dto;


import com.dh.grup8.IntegradorBackend.security.dto.UserReduxDto;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Set;


@Getter
@Setter
public class ReservationDto {

    private Long id;
    private UserReduxDto user;
    private ProductForReservationDto product;
    private LocalDate startDate;
    private  LocalDate endDate;
    private String name;
    private String lastName;
    private String email;
    @NotEmpty(message = "City can not be empty")
    @NotNull(message = "City can not be null")
    private String city;
    @NotEmpty(message = "City can not be empty")
    @NotNull(message = "The time of cheking not be null")
    private String checkIn;
    private Set<MessageForReservationDto> messages;
    private Timestamp createdAt;


    public ReservationDto() {
    }
}
