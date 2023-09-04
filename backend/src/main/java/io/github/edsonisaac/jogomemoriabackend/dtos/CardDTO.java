package io.github.edsonisaac.jogomemoriabackend.dtos;

import io.github.edsonisaac.jogomemoriabackend.models.Card;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public record CardDTO(
        UUID id,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate,
        String createdByUser,
        String modifiedByUser,
        ImageDTO image
) implements Serializable {

    public static CardDTO toDTO(Card card) {

        return new CardDTO(
                card.getId(),
                card.getCreatedDate(),
                card.getLastModifiedDate(),
                card.getCreatedByUser(),
                card.getModifiedByUser(),
                card.getImage() != null ? ImageDTO.toDTO(card.getImage()) : null
        );
    }
}