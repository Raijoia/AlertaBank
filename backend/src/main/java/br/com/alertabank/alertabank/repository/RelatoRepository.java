package br.com.alertabank.alertabank.repository;

import br.com.alertabank.alertabank.model.Relato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RelatoRepository extends JpaRepository<Relato, UUID> {
}