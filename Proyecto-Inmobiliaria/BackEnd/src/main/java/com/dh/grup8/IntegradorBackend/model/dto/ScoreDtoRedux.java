package com.dh.grup8.IntegradorBackend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreDtoRedux {

    private Long id;
    private Integer score;

    public ScoreDtoRedux() {
    }
}
