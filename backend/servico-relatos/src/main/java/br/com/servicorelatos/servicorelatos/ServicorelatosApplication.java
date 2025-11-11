package br.com.servicorelatos.servicorelatos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ServicorelatosApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicorelatosApplication.class, args);
	}

}
