package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;


@Getter
@Setter
public class ReservationForUserDto {

    private Long id;
    private ProductReduxDto product;
    private LocalDate startDate;
    private  LocalDate endDate;
    private String name;
    private String lastName;
    private String email;
//    private CitiesReduxDto city;
    @NotEmpty(message = "City can not be empty")
    @NotNull(message = "City can not be null")
    private String city;
    @NotEmpty(message = "City can not be empty")
    @NotNull(message = "The time of cheking not be null")
    private String checkIn;
//    private Set<MessageForReservationDto> messages;

    public ReservationForUserDto() {
    }
}
