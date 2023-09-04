package io.github.edsonisaac.jogomemoriabackend.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfiguration {

    @Bean
    OpenAPI openAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Jodo da Memória")
                        .description("Jogo da Memória desenvolvido para a disciplina Interação Humano-Computador no IFBA, " +
                                "Instituto Federal de Educação, Ciência e Tecnologia da Bahia - Campus Irecê")
                );
    }
}