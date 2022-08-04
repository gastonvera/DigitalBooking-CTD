package com.dh.grup8.IntegradorBackend.security.service;

import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import com.dh.grup8.IntegradorBackend.security.enums.RolName;
import com.dh.grup8.IntegradorBackend.security.repository.IRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolService {

    @Autowired
    IRolRepository rolRepository;

    public Rol findByRolName(RolName rolName){
        return  rolRepository.findByRolName(rolName);
    }

    public void save(Rol rol){
        rolRepository.save(rol);
    }

}
