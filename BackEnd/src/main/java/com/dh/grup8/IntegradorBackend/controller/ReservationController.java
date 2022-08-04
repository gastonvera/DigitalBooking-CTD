package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.exceptions.ResourceNotFoundException;
import com.dh.grup8.IntegradorBackend.model.dto.ReservationDto;
import com.dh.grup8.IntegradorBackend.model.service.Impl.ReservationService;
import com.dh.grup8.IntegradorBackend.security.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    ReservationService reservationService;
    @Autowired
    EmailSenderService emailSenderService;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> create(@Valid @RequestBody ReservationDto reservationDto) {
        try {
            reservationService.create(reservationDto);
            ScheduledExecutorService ses = Executors.newScheduledThreadPool(1);
            Runnable task2 = ()->{
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setTo(reservationDto.getEmail());
                mailMessage.setSubject("DigitalBooking reservation success!!");
                mailMessage.setFrom("davideliasmoriello@gmail.com");
                mailMessage.setText(reservationDto.getName()+" "+reservationDto.getLastName()+" your reservation in "+reservationDto.getProduct().getName() + " is complete.");
                emailSenderService.sendEmail(mailMessage);
            };
            ses.schedule(task2, 3, TimeUnit.SECONDS);
            ses.shutdown();
            return new ResponseEntity<>(reservationDto,HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("error: " + e.getMessage());
        }

    }

    @CrossOrigin
    @GetMapping("/id/{recervationID}")
    public ResponseEntity<?> findByID(@PathVariable Long recervationID )throws ResourceNotFoundException {
        ReservationDto reservationDto = reservationService.findById(recervationID);
        return new ResponseEntity<>(reservationDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll() {
        Set<ReservationDto> reservationDtoSet = reservationService.findAll();
        return new ResponseEntity<>(reservationDtoSet, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ReservationDto reservationDto) throws ResourceNotFoundException {
        reservationService.update(reservationDto);
        return new ResponseEntity<>(reservationDto, HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{recervationID}")
    public ResponseEntity<?> delete(@PathVariable Long recervationID) throws ResourceNotFoundException {
        reservationService.deleteById(recervationID);
        return new ResponseEntity<>("Reservation delete complete", HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/product/{productID}")
    public ResponseEntity<?> findReservationByProductId(@PathVariable Long productID) throws ResourceNotFoundException{
        List<ReservationDto> reservationDtoList = reservationService.findReservationByProductId(productID);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/user/{userID}")
    public ResponseEntity<?> findReservationsByUserId(@PathVariable Long userID) throws ResourceNotFoundException{
        List<ReservationDto> reservationDtoList = reservationService.findReservationsByUserId(userID);
        return new ResponseEntity<>(reservationDtoList, HttpStatus.OK);
    }

}
