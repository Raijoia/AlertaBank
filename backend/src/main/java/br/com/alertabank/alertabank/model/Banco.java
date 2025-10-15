// backend/src/main/java/br/com/alertabank/alertabank/model/Banco.java

package br.com.alertabank.alertabank.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "tb_bancos")
@Getter
@Setter
public class Banco {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "char(36)")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nome;
}