package io.github.edsonisaac.jogomemoriabackend.services;

import io.github.edsonisaac.jogomemoriabackend.dtos.CardDTO;
import io.github.edsonisaac.jogomemoriabackend.exceptions.ObjectNotFoundException;
import io.github.edsonisaac.jogomemoriabackend.exceptions.ValidationException;
import io.github.edsonisaac.jogomemoriabackend.models.Card;
import io.github.edsonisaac.jogomemoriabackend.repositories.CardRepository;
import io.github.edsonisaac.jogomemoriabackend.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CardService implements AbstractService<Card, CardDTO> {

    private final CardRepository repository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(UUID id) {

        if (id != null) {

            if (repository.existsById(id)) {
                repository.deleteById(id);
                return;
            }
        }

        throw new ObjectNotFoundException(MessageUtils.CARD_NOT_FOUND);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Page<CardDTO> findAll(Integer page, Integer size, String sort, String direction) {
        final var cards = repository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sort)));
        return cards.map(CardDTO::toDTO);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public CardDTO findById(UUID id) {
        final var card = repository.findById(id).orElseThrow(() -> new ObjectNotFoundException(MessageUtils.CARD_NOT_FOUND));
        return CardDTO.toDTO(card);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public CardDTO save(Card card) {
        validate(card);
        card = repository.save(card);
        return CardDTO.toDTO(card);
    }

    @Override
    public void validate(Card card) {

        if (card == null) {
            throw new ValidationException(MessageUtils.CARD_NULL);
        }
    }
}