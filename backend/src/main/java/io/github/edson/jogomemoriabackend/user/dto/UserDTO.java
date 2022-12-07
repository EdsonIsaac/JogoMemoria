package io.github.edson.jogomemoriabackend.user.dto;

import io.github.edson.jogomemoriabackend.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private Long id;
    private String name;
    private String username;
    private String password;
    private boolean enabled;

    public static UserDTO toDTO (User user) {

        return new UserDTO(
            user.getId(),
            user.getName(),
            user.getUsername(),
            user.getPassword(),
            user.isEnabled()
        );
    }
}