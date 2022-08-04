package com.dh.grup8.IntegradorBackend.security.controller;


import com.dh.grup8.IntegradorBackend.exceptions.ResourceNotFoundException;
import com.dh.grup8.IntegradorBackend.security.dto.AuthenticationRequestDto;
import com.dh.grup8.IntegradorBackend.security.dto.UserDto;
import com.dh.grup8.IntegradorBackend.security.dto.UserReduxDto;
import com.dh.grup8.IntegradorBackend.security.entity.User;
import com.dh.grup8.IntegradorBackend.security.repository.IUserRepository;
import com.dh.grup8.IntegradorBackend.security.service.EmailSenderService;
import com.dh.grup8.IntegradorBackend.security.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    IUserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    EmailSenderService emailSenderService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        User existingUser = modelMapper.map(userService.findByEmail(userDto.getEmail()), User.class);
        if (userDto.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters long");
        }
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists.");
        } else {
            try {
                userService.saveUser(userDto);
                ScheduledExecutorService ses = Executors.newScheduledThreadPool(1);
                Runnable task2 = ()->{
                    SimpleMailMessage mailMessage = new SimpleMailMessage();
                    mailMessage.setTo(userDto.getEmail());
                    mailMessage.setSubject("DigitalBooking complete Registration!");
                    mailMessage.setFrom("davideliasmoriello@gmail.com");
                    mailMessage.setText("Welcome to Digital Booking "+ userDto.getName()+" "+userDto.getLastName() );
                    emailSenderService.sendEmail(mailMessage);
                };
                ses.schedule(task2, 3, TimeUnit.SECONDS);
                ses.shutdown();
                return new ResponseEntity<>(HttpStatus.CREATED);
            } catch (Exception e) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("error: " + e.getMessage());
            }


        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody AuthenticationRequestDto userDto){
        Optional<User> user = userService.findByEmail(userDto.getEmail());
        if (user.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UserDto userDtoResponse = modelMapper.map(user, UserDto.class);
        UserReduxDto userResponse = new UserReduxDto();
        userResponse.setId(userDtoResponse.getId());
        userResponse.setName(userDtoResponse.getName());
        userResponse.setLastName(userDtoResponse.getLastName());
        userResponse.setEmail(userDtoResponse.getEmail());
        userResponse.setRol(userDtoResponse.getRol());
        userResponse.setToken(userService.logInUser(userDto));
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/id/{userId}")
    public ResponseEntity<?> findByID(@PathVariable Long userId) throws ResourceNotFoundException {
        UserDto userDto = modelMapper.map(userRepository.findById(userId), UserDto.class);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

}
