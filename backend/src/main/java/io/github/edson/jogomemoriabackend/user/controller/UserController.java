package io.github.edson.jogomemoriabackend.user.controller;

import io.github.edson.jogomemoriabackend.infrastructure.service.Facade;
import io.github.edson.jogomemoriabackend.user.dto.UserDTO;
import io.github.edson.jogomemoriabackend.user.model.User;
import io.github.edson.jogomemoriabackend.user.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private final Facade facade;
    private final UserUtil userUtil;

    @Autowired
    public UserController(Facade facade, UserUtil userUtil) {
        this.facade = facade;
        this.userUtil = userUtil;
    }

    @GetMapping("/find")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO find (@RequestParam(required = false) String username) {
        if (username != null) return UserDTO.toDTO(facade.userFindByUsername(username));
        return null;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> findAll () {
        return facade.userFindAll().stream().map(user -> UserDTO.toDTO(user)).collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO save (@RequestBody @Valid User user) {
        user = userUtil.encodePassword(user);
        return UserDTO.toDTO(facade.userSave(user));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO update (@RequestBody @Valid User user) {
        user = userUtil.update(user);
        return UserDTO.toDTO(facade.userUpdate(user));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete (@PathVariable Long id) {
        User user = userUtil.delete(facade.userFindById(id));
        facade.userDelete(user);
    }
}