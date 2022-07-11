package com.dh.grup8.IntegradorBackend.model.repository;

import com.dh.grup8.IntegradorBackend.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMessagesRepository extends JpaRepository<Message, Long> {
}
