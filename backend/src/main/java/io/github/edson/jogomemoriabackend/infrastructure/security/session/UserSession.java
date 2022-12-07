package io.github.edson.jogomemoriabackend.infrastructure.security.session;

import io.github.edson.jogomemoriabackend.infrastructure.security.model.UserSecurity;
import io.github.edson.jogomemoriabackend.user.model.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserSession {

    public static User getCurrentUser () {
        UserSecurity principal = (UserSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = new User();
        user.setId(principal.getId());
        user.setUsername(principal.getUsername());
        user.setPassword(principal.getPassword());

        return user;
    }
}