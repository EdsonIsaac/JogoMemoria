package io.github.edson.jogomemoriabackend.user.service;

import io.github.edson.jogomemoriabackend.infrastructure.exception.ObjectNotFoundException;
import io.github.edson.jogomemoriabackend.infrastructure.exception.ValidationException;
import io.github.edson.jogomemoriabackend.user.model.User;
import io.github.edson.jogomemoriabackend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findById (Long id) {
        return userRepository.findById(id).orElseThrow(() -> {
            throw new ObjectNotFoundException("Usuário não encontrado!");
        });
    }

    public User findByUsername (String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> {
            throw new ObjectNotFoundException("Usuário não encontrado!");
        });
    }

    public List<User> findAll () {
        return userRepository.findAll();
    }

    public User save (User user) {

        if (user == null) throw new ValidationException("Usuário nulo!");

        if (validateUser(user)) userRepository.save(user);

        return user;
    }

    public User update (User user) {

        if (user == null) throw new ValidationException("Usuário nulo!");

        if (!userRepository.existsById(user.getId())) throw new ObjectNotFoundException("Usuário não encontrado!");

        if (validateUser(user)) userRepository.save(user);

        return user;
    }

    public void delete (User user) {

        if (user == null) throw new ValidationException("Usuário nulo!");

        if (!userRepository.existsById(user.getId())) throw new ObjectNotFoundException("Usuário não encontrado!");

        userRepository.delete(user);
    }

    public boolean validateUser (User user) {

        User user_findByUsername = userRepository.findByUsername(user.getUsername()).orElse(null);

        if (user_findByUsername != null && !user_findByUsername.equals(user)) throw new ValidationException("Usuário já cadastrado!");

        return true;
    }
}