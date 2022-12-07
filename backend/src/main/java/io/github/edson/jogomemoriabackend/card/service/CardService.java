package io.github.edson.jogomemoriabackend.card.service;

import io.github.edson.jogomemoriabackend.card.model.Card;
import io.github.edson.jogomemoriabackend.card.repository.CardRepository;
import io.github.edson.jogomemoriabackend.infrastructure.exception.ObjectNotFoundException;
import io.github.edson.jogomemoriabackend.infrastructure.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card findById (Long id) {
        return cardRepository.findById(id).orElseThrow(() -> {
            throw new ObjectNotFoundException("Carta não encontrada!");
        });
    }

    public List<Card> findAll () {
        return cardRepository.findAll();
    }

    public Card save (Card card) {

        if (card == null) throw new ValidationException("Carta nula!");

        return cardRepository.save(card);
    }

    public Card update (Card card) {

        if (card == null) throw new ValidationException("Carta nula!");

        if (!cardRepository.existsById(card.getId())) throw new ObjectNotFoundException("Carta não encontrada!");

        return cardRepository.save(card);
    }

    public void delete (Card card) {

        if (card == null) throw new ValidationException("Carta nula!");

        if (!cardRepository.existsById(card.getId())) throw new ObjectNotFoundException("Carta não encontrada!");

        cardRepository.delete(card);
    }
}