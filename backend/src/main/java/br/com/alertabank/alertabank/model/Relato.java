// backend/src/main/java/br/com/alertabank/alertabank/model/Relato.java

package br.com.alertabank.alertabank.model;

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

    @ManyToOne
    @JoinColumn(name = "banco_id", nullable = false)
    private Banco banco;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @CreationTimestamp
    @Column(name = "data_ocorrido", updatable = false)
    private LocalDateTime dataOcorrido;
}