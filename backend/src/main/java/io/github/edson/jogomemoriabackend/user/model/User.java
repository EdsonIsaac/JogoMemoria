package io.github.edson.jogomemoriabackend.user.model;

import io.github.edson.jogomemoriabackend.infrastructure.model.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "tb_user")
public class User extends AbstractEntity {

    @Column(length = 100)
    @NotEmpty(message = "{field.name.empty}")
    private String name;

    @Column(length = 100)
    @NotEmpty(message = "{field.username.empty}")
    private String username;

    @Column(length = 100)
    @NotEmpty(message = "{field.password.empty}")
    private String password;

    @NotNull(message = "{field.enabled.null}")
    private boolean enabled;
}