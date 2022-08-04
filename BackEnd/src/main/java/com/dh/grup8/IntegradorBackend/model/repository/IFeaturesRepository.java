package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Features;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeaturesRepository extends JpaRepository<Features, Long> {
}
