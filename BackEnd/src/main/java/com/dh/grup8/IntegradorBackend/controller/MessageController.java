package com.dh.grup8.IntegradorBackend.controller;

import com.dh.grup8.IntegradorBackend.exceptions.ResourceNotFoundException;
import com.dh.grup8.IntegradorBackend.model.dto.ReservationMessageDto;
import com.dh.grup8.IntegradorBackend.model.service.Impl.ReservationMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    ReservationMessageService messageService;

    @CrossOrigin
    @PostMapping("/save")
    public ResponseEntity<?> create(@Valid @RequestBody ReservationMessageDto messageDto) {
        messageService.create(messageDto);
        return new ResponseEntity<>(messageDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{messageID}")
    public ResponseEntity<?> findByID(@PathVariable Long messageID )throws ResourceNotFoundException {
        ReservationMessageDto messageDto = messageService.findById(messageID);
        return new ResponseEntity<>(messageDto, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/viewAll")
    public ResponseEntity<?> findAll() {
        Set<ReservationMessageDto> messageDtoSet = messageService.findAll();
        return new ResponseEntity<>(messageDtoSet, HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody ReservationMessageDto messageDto) throws ResourceNotFoundException {
        try {
            messageService.update(messageDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    @CrossOrigin
    @DeleteMapping("/delete/{messageID}")
    public ResponseEntity<?> delete(@PathVariable Long messageID) throws ResourceNotFoundException {
        messageService.deleteById(messageID);
        return new ResponseEntity<>("Message delete complete", HttpStatus.OK);
    }

}
