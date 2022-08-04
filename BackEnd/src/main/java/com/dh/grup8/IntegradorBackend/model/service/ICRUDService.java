package com.dh.grup8.IntegradorBackend.model.service;

import com.dh.grup8.IntegradorBackend.exceptions.*;

import java.util.Set;

public interface ICRUDService<T> {
    T findById(Long id) throws ResourceNotFoundException;
    T create(T t);
    void deleteById(Long id) throws ResourceNotFoundException;
    T update(T t) throws ResourceNotFoundException;
    Set<T> findAll();
}
