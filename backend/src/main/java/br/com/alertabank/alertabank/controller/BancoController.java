package br.com.alertabank.alertabank.controller;

import br.com.alertabank.alertabank.model.Banco;
import br.com.alertabank.alertabank.repository.BancoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bancos")
@CrossOrigin(origins = "*")
public class BancoController {

    @Autowired
    private BancoRepository bancoRepository;

    @GetMapping
    public ResponseEntity<List<Banco>> listarTodos() {
        List<Banco> bancos = bancoRepository.findAll();
        return ResponseEntity.ok(bancos);
    }
}