package br.com.servicorelatos.servicorelatos.controller;

import br.com.servicorelatos.servicorelatos.dto.RelatoDTO;
import br.com.servicorelatos.servicorelatos.model.Relato;
import br.com.servicorelatos.servicorelatos.repository.RelatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/relatos")
public class RelatoController {

    @Autowired
    private RelatoRepository relatoRepository;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<?> cadastrarRelato(@RequestBody RelatoDTO relatoDTO) {

        if (relatoDTO.getBancoId() == null) {
            return ResponseEntity.badRequest().body(Map.of("erro", "O campo 'bancoId' não pode ser nulo."));
        }

        try {
            String bancoServiceUrl = "http://SERVICO-BANCOS/bancos/" + relatoDTO.getBancoId();

            restTemplate.getForEntity(bancoServiceUrl, String.class);

        } catch (HttpClientErrorException.NotFound e) {
            String mensagemErro = "Banco com ID '" + relatoDTO.getBancoId() + "' não encontrado.";
            return ResponseEntity.status(404).body(Map.of("erro", mensagemErro));
        }

        Relato novoRelato = new Relato();
        novoRelato.setBancoId(relatoDTO.getBancoId());
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