package io.github.edsonisaac.jogomemoriabackend.configurations;

import io.github.edsonisaac.jogomemoriabackend.enums.Department;
import io.github.edsonisaac.jogomemoriabackend.exceptions.ObjectNotFoundException;
import io.github.edsonisaac.jogomemoriabackend.models.User;
import io.github.edsonisaac.jogomemoriabackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
@RequiredArgsConstructor
public class ApplicationConfiguration implements CommandLineRunner {

    private final UserService service;

    @Override
    public void run(String... args) {
        checkDefaultUser();
        createFolders();
    }

    private void createFolders() {

        final var data = new File("data");

        if (!data.exists()) {
            data.mkdir();
        }

        final var files = new File("data/files");

        if (!files.exists()) {
            files.mkdir();
        }

        final var images = new File("data/files/images");

        if (!images.exists()) {
            images.mkdir();
        }
    }

    private void checkDefaultUser() {

        final var user = new User();

        try {
            final var userDTO = service.findByUsername("admin");
            BeanUtils.copyProperties(userDTO, user);
        } catch (ObjectNotFoundException ex) { }

        saveDefaultUser(user);
    }

    private void saveDefaultUser(User user) {

        user.setName("ADMINISTRADOR");
        user.setUsername("admin");
        user.setPassword("admin");
        user.setEnabled(true);
        user.setDepartment(Department.SUPPORT);

        service.save(user);
    }
}
