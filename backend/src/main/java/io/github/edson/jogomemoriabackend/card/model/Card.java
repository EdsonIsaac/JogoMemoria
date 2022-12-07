package io.github.edson.jogomemoriabackend.card.model;

import io.github.edson.jogomemoriabackend.infrastructure.model.AbstractEntity;
import io.github.edson.jogomemoriabackend.infrastructure.security.session.UserSession;
import io.github.edson.jogomemoriabackend.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotEmpty;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity(name = "tb_card")
public class Card extends AbstractEntity {

    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "{field.cardone.empty}")
    private String cardOne;

    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "{field.cardtwo.empty}")
    private String cardTwo;

    @ManyToOne
    private User user;

    @PrePersist
    private void prePersist () {
        user = UserSession.getCurrentUser();
    }
}