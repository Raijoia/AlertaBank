package br.com.alertabank.alertabank.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class RelatoDTO {
    private String bancoId;
    private String descricao;
}