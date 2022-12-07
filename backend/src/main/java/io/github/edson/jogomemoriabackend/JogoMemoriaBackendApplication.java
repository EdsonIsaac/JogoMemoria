package io.github.edson.jogomemoriabackend;

import io.github.edson.jogomemoriabackend.infrastructure.exception.ObjectNotFoundException;
import io.github.edson.jogomemoriabackend.infrastructure.service.Facade;
import io.github.edson.jogomemoriabackend.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class JogoMemoriaBackendApplication implements CommandLineRunner {

	private final Facade facade;
	private final BCryptPasswordEncoder encoder;

	@Autowired
	public JogoMemoriaBackendApplication(Facade facade, BCryptPasswordEncoder encoder) {
		this.facade = facade;
		this.encoder = encoder;
	}

	public static void main(String[] args) {
		SpringApplication.run(JogoMemoriaBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		try {
			User user = facade.userFindByUsername("admin");
			saveDefaultUser(user);
		} catch (ObjectNotFoundException ex) {
			saveDefaultUser(new User());
		}
	}

	private void saveDefaultUser (User user) {

		user.setName("Administrador");
		user.setUsername("admin");
		user.setPassword(encoder.encode(":aP.5ePDJSE3{!2I"));
		user.setEnabled(true);

		facade.userSave(user);
	}
}
