package com.dh.grup8.IntegradorBackend.security.repository;

import com.dh.grup8.IntegradorBackend.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE email = ?1")
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}
