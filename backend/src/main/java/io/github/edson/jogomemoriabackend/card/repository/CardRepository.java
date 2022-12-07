package io.github.edson.jogomemoriabackend.card.repository;

import io.github.edson.jogomemoriabackend.card.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> { }