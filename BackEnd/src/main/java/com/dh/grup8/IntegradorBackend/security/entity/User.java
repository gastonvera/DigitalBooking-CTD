package com.dh.grup8.IntegradorBackend.security.entity;

import com.dh.grup8.IntegradorBackend.model.entity.Reservation;
import com.dh.grup8.IntegradorBackend.model.entity.Score;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String lastName;
    private String email;
    private String password;
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Rol rol;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<Reservation> reservations;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private Set<Score> scores;


}
