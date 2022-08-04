package com.dh.grup8.IntegradorBackend.security.repository;

import com.dh.grup8.IntegradorBackend.security.entity.Rol;
import com.dh.grup8.IntegradorBackend.security.enums.RolName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRolRepository extends JpaRepository<Rol, Long> {

    Rol findByRolName(RolName rolName);
}
