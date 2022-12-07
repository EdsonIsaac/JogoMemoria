package io.github.edson.jogomemoriabackend.card.dto;

import io.github.edson.jogomemoriabackend.card.model.Card;
import io.github.edson.jogomemoriabackend.user.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CardDTO {

    private Long id;
    private String cardOne;
    private String cardTwo;
    private UserDTO user;

    public static CardDTO toDTO (Card card) {

        return new CardDTO(
            card.getId(),
            card.getCardOne(),
            card.getCardTwo(),
            UserDTO.toDTO(card.getUser())
        );
    }
}