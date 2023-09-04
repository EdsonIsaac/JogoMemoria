package io.github.edsonisaac.jogomemoriabackend.repositories;

import io.github.edsonisaac.jogomemoriabackend.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CardRepository extends JpaRepository<Card, UUID> { }