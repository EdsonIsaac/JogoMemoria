package io.github.edson.jogomemoriabackend.user.util;

import io.github.edson.jogomemoriabackend.infrastructure.exception.OperationFailureException;
import io.github.edson.jogomemoriabackend.infrastructure.security.session.UserSession;
import io.github.edson.jogomemoriabackend.infrastructure.service.Facade;
import io.github.edson.jogomemoriabackend.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    private final BCryptPasswordEncoder encoder;
    private final Facade facade;

    @Autowired
    public UserUtil(BCryptPasswordEncoder encoder, Facade facade) {
        this.encoder = encoder;
        this.facade = facade;
    }

    public User delete (User user) {
        if (user.equals(UserSession.getCurrentUser())) throw new OperationFailureException("O usuário não pode excluir a si próprio!");
        return user;
    }

    public User encodePassword (User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return user;
    }

    public User update (User user) {

        User user_old = facade.userFindById(user.getId());

        if (!user.getPassword().equals(user_old.getPassword())) {

            if (user.equals(UserSession.getCurrentUser())) {
                user.setPassword(encoder.encode(user.getPassword()));
            }

            else {
                throw new OperationFailureException("O usuário atual não possui permissão para alterar a senha de outro usuário!");
            }
        }

        return user;
    }
}