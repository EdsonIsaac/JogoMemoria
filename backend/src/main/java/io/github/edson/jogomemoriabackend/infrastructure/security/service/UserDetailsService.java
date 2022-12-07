package io.github.edson.jogomemoriabackend.infrastructure.security.service;

import io.github.edson.jogomemoriabackend.infrastructure.exception.ObjectNotFoundException;
import io.github.edson.jogomemoriabackend.infrastructure.security.model.UserSecurity;
import io.github.edson.jogomemoriabackend.infrastructure.service.Facade;
import io.github.edson.jogomemoriabackend.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private final Facade facade;

    @Autowired
    public UserDetailsService(Facade facade) {
        this.facade = facade;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            User user = facade.userFindByUsername(username);
            return new UserSecurity(user.getId(), user.getUsername(), user.getPassword(), user.isEnabled());
        } catch (ObjectNotFoundException ex) { }

        throw new UsernameNotFoundException("Usuário não encontrado!");
    }
}