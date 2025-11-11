package br.com.servicorelatos.servicorelatos.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_relatos")
@Getter
@Setter
public class Relato {

    @Id
    @GeneratedValue(generator = "UUID")

    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )

    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "char(36)")
    private UUID id;

    @Column(name = "banco_id", nullable = false, columnDefinition = "char(36)")
    private String bancoId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @CreationTimestamp
    @Column(name = "data_ocorrido", updatable = false)
    private LocalDateTime dataOcorrido;
}