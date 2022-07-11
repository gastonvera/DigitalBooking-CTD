package com.dh.grup8.IntegradorBackend.model.entity;

import com.dh.grup8.IntegradorBackend.security.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"score"})
    @JoinColumn(name = "fk_product")
    private Product product;
    private Integer score;
    private boolean favorite;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"score"})
    private User user;



}
