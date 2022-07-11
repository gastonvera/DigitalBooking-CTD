package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Cities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICitiesRepository extends JpaRepository<Cities, Long> {

}
