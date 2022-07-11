package com.dh.grup8.IntegradorBackend.model.entity;

import com.dh.grup8.IntegradorBackend.security.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_user", referencedColumnName = "id", nullable = false)
    private User user;
    @ManyToOne(cascade =CascadeType.MERGE)
    @JoinColumn(name = "fk_producto", referencedColumnName ="id", nullable = false)
    private Product product;
    private LocalDate startDate;
    private LocalDate endDate;
    private String name;
    private String lastName;
    private String email;
    private String city;
    private String checkIn;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "reservation", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"reservation"})
    private Set<Message> messages;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

}
