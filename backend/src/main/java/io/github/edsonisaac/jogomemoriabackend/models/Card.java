package io.github.edsonisaac.jogomemoriabackend.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.validation.Valid;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_cards")
public class Card extends AbstractEntity {

    @Valid
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Image image;
}