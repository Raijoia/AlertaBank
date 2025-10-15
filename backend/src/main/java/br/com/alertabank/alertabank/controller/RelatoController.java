package br.com.alertabank.alertabank.controller;

import br.com.alertabank.alertabank.dto.RelatoDTO;
import br.com.alertabank.alertabank.model.Banco;
import br.com.alertabank.alertabank.model.Relato;
import br.com.alertabank.alertabank.repository.BancoRepository;
import br.com.alertabank.alertabank.repository.RelatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/relatos")
@CrossOrigin(origins = "*")
public class RelatoController {

    @Autowired
    private RelatoRepository relatoRepository;

    @Autowired
    private BancoRepository bancoRepository;

    @PostMapping
    public ResponseEntity<Relato> cadastrarRelato(@RequestBody RelatoDTO relatoDTO) {
        Optional<Banco> bancoOptional = bancoRepository.findById(relatoDTO.getBancoId());
        if (bancoOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Relato novoRelato = new Relato();
        novoRelato.setBanco(bancoOptional.get());
        novoRelato.setDescricao(relatoDTO.getDescricao());

        Relato relatoSalvo = relatoRepository.save(novoRelato);
        return ResponseEntity.status(201).body(relatoSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Relato>> listarTodos() {
        List<Relato> relatos = relatoRepository.findAll();
        return ResponseEntity.ok(relatos);
    }
}