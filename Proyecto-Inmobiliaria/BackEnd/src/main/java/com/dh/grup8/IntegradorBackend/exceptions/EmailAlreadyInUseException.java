package com.dh.grup8.IntegradorBackend.exceptions;

public class EmailAlreadyInUseException extends RuntimeException{

    public EmailAlreadyInUseException(String message) {
        super(message);
    }
}
