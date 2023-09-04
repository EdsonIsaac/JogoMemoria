package io.github.edsonisaac.jogomemoriabackend.dtos;

import io.github.edsonisaac.jogomemoriabackend.enums.Department;
import io.github.edsonisaac.jogomemoriabackend.models.User;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public record UserDTO(
        UUID id,
        LocalDateTime createdDate,
        LocalDateTime lastModifiedDate,
        String createdByUser,
        String modifiedByUser,
        String name,
        String username,
        String password,
        Boolean enabled,
        Department department,
        ImageDTO photo
) implements Serializable {

    public static UserDTO toDTO(User user) {

        return new UserDTO(
                user.getId(),
                user.getCreatedDate(),
                user.getLastModifiedDate(),
                user.getCreatedByUser(),
                user.getModifiedByUser(),
                user.getName(),
                user.getUsername(),
                user.getPassword(),
                user.getEnabled(),
                user.getDepartment(),
                user.getPhoto() != null ? ImageDTO.toDTO(user.getPhoto()) : null);
    }
}