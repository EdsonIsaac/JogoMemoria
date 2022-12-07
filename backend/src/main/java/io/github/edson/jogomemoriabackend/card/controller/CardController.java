package io.github.edson.jogomemoriabackend.card.controller;

import io.github.edson.jogomemoriabackend.card.dto.CardDTO;
import io.github.edson.jogomemoriabackend.card.model.Card;
import io.github.edson.jogomemoriabackend.infrastructure.service.Facade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cards")
public class CardController {

    private final Facade facade;

    @Autowired
    public CardController(Facade facade) {
        this.facade = facade;
    }

    @GetMapping
    public List<CardDTO> findAll () {
        return facade.cardFindAll().stream().map(card -> CardDTO.toDTO(card)).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CardDTO save (@RequestBody @Valid Card card) {
        return CardDTO.toDTO(facade.cardSave(card));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CardDTO update (@RequestBody @Valid Card card) {
        return CardDTO.toDTO(facade.cardUpdate(card));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable Long id) {
        facade.cardDelete(facade.cardFindById(id));
    }
}