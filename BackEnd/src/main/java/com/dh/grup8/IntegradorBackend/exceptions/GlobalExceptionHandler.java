package com.dh.grup8.IntegradorBackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> allErrors(Exception exception, WebRequest req){
        return new ResponseEntity<>("Error "+ exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> notFound(Exception exception, WebRequest req){
        return new ResponseEntity<>("Error "+ exception.getMessage(), HttpStatus.NOT_FOUND);
    }

//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<?> emailAlreadyInUse(Exception exception, WebRequest req){
//        return new ResponseEntity<>("Error "+ exception.getMessage(), HttpStatus.BAD_REQUEST);
//    }

}
