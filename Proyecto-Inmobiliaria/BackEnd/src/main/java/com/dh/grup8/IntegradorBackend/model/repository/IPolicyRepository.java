package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPolicyRepository extends JpaRepository<Policy, Long> {
}
