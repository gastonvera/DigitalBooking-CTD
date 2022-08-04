package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE product.id = ?1")
    List<Reservation> findReservationByProductId(Long id);

    @Query("SELECT r FROM Reservation r WHERE user.id = ?1")
    List<Reservation> findReservationsByUserId(Long id);

//    SELECT p FROM Product p WHERE ?1 NOT IN (SELECT fk_producto FROM Reservation r WHERE r.start_date = ?2 AND r.end_date = ?3


}
