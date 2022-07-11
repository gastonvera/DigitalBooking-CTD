package com.dh.grup8.IntegradorBackend.model.entity;

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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String urlImage;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private Set<Product> products;

}
