package com.dh.grup8.IntegradorBackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1000)
    private ArrayList description;
    private String referencias;
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false, referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"products"})
    private Category category;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_features", referencedColumnName = "id")
    private Features features;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"products"})
    private Cities cities;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "policy", referencedColumnName = "id")
    private Policy policy;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @JsonIgnoreProperties(value = {"products"})
    private Set<Score> scores;
    private Double averageScore;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
    @JsonIgnoreProperties(value = {"products"})
    private Set<Reservation> reservations;
    private Double latitude;
    private Double longitude;
    private String address;
    private ArrayList checkInRange_list;
    private Integer pricePerNight;
}
