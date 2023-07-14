package com.partner.chatbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ChatbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatbackendApplication.class, args);
	}

}
