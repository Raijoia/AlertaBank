package br.com.servicobancos.servicobancos.controller;

import br.com.servicobancos.servicobancos.model.Banco;
import br.com.servicobancos.servicobancos.repository.BancoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/bancos")
public class BancoController {

    @Autowired
    private BancoRepository bancoRepository;

    @GetMapping
    public ResponseEntity<List<Banco>> listarTodos() {
        List<Banco> bancos = bancoRepository.findAll();
        return ResponseEntity.ok(bancos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Banco> buscarPorId(@PathVariable String id) {
        Optional<Banco> banco = bancoRepository.findById(id);
        if (banco.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(banco.get());
    }
}