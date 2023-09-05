package io.github.edsonisaac.jogomemoriabackend.controllers;

import io.github.edsonisaac.jogomemoriabackend.dtos.CardDTO;
import io.github.edsonisaac.jogomemoriabackend.models.Card;
import io.github.edsonisaac.jogomemoriabackend.models.Image;
import io.github.edsonisaac.jogomemoriabackend.services.CardService;
import io.github.edsonisaac.jogomemoriabackend.utils.FileUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.UUID;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController implements AbstractController<Card, CardDTO> {

    private final CardService service;

    @Override
    @DeleteMapping("/{id}")
    @ResponseStatus(OK)
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMINISTRATION', 'SCOPE_SUPPORT')")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }

    @Override
    @GetMapping
    @ResponseStatus(OK)
    public Page<CardDTO> findAll(@RequestParam(required = false, defaultValue = "0") Integer page,
                                 @RequestParam(required = false, defaultValue = "10") Integer size,
                                 @RequestParam(required = false, defaultValue = "createdDate") String sort,
                                 @RequestParam(required = false, defaultValue = "desc") String direction) {

        return service.findAll(page, size, sort, direction);
    }

    @Override
    @GetMapping("/{id}")
    @ResponseStatus(OK)
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMINISTRATION', 'SCOPE_SUPPORT')")
    public CardDTO findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @Override
    public CardDTO save(Card card) {
        return null;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(CREATED)
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMINISTRATION', 'SCOPE_SUPPORT')")
    public CardDTO save(@RequestPart @Valid Card card,
                        @RequestPart MultipartFile image) {

        handleImage(card, image);
        return service.save(card);
    }

    @Override
    @PutMapping(value = "/{id}")
    @ResponseStatus(NOT_IMPLEMENTED)
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMINISTRATION', 'SCOPE_SUPPORT')")
    public CardDTO update(@PathVariable UUID id, Card card) {
        return null;
    }

    private void handleImage(Card card, MultipartFile image) {

        if (image != null) {

            final var imageToSave = Image.builder()
                    .name(System.currentTimeMillis() + "." + FileUtils.getExtension(Objects.requireNonNull(image.getOriginalFilename())))
                    .build();

            card.setImage(imageToSave);
            FileUtils.FILES.put(imageToSave.getName(), image);
        }
    }
}