package br.com.servicobancos.servicobancos.repository;

import br.com.servicobancos.servicobancos.model.Banco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BancoRepository extends JpaRepository<Banco, String> {
}