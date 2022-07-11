package com.dh.grup8.IntegradorBackend.security.entity;

import com.dh.grup8.IntegradorBackend.security.enums.RolName;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RolName rolName;

}
