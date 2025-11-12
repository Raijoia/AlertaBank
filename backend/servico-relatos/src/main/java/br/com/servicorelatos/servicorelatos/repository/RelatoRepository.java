package br.com.servicorelatos.servicorelatos.repository;

import br.com.servicorelatos.servicorelatos.model.Relato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RelatoRepository extends JpaRepository<Relato, String> {
}