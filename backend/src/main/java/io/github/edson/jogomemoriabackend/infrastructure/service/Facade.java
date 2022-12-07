package io.github.edson.jogomemoriabackend.infrastructure.service;

import io.github.edson.jogomemoriabackend.card.model.Card;
import io.github.edson.jogomemoriabackend.card.service.CardService;
import io.github.edson.jogomemoriabackend.user.model.User;
import io.github.edson.jogomemoriabackend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Facade {

    private final CardService cardService;
    private final UserService userService;

    @Autowired
    public Facade(CardService cardService, UserService userService) {
        this.cardService = cardService;
        this.userService = userService;
    }

    /********************************************* CARD *********************************************/

    public Card cardFindById (Long id) {
        return cardService.findById(id);
    }

    public List<Card> cardFindAll () {
        return cardService.findAll();
    }

    public Card cardSave (Card card) {
        return cardService.save(card);
    }

    public Card cardUpdate (Card card) {
        return cardService.update(card);
    }

    public void cardDelete (Card card) {
        cardService.delete(card);
    }

    /********************************************* USER *********************************************/

    public User userFindById (Long id) {
        return userService.findById(id);
    }

    public User userFindByUsername (String username) {
        return userService.findByUsername(username);
    }

    public List<User> userFindAll () {
        return userService.findAll();
    }

    public User userSave (User user) {
        return userService.save(user);
    }

    public User userUpdate (User user) {
        return userService.update(user);
    }

    public void userDelete (User user) {
        userService.delete(user);
    }
}