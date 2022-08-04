package com.dh.grup8.IntegradorBackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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


public class Cities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private String province;
    private String country;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cities")
    @JsonIgnoreProperties(value = {"cities"})
    private Set<Product> products;


}
