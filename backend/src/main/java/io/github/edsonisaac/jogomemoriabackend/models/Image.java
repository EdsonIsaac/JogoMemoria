package io.github.edsonisaac.jogomemoriabackend.models;

import io.github.edsonisaac.jogomemoriabackend.exceptions.OperationFailureException;
import io.github.edsonisaac.jogomemoriabackend.utils.FileUtils;
import io.github.edsonisaac.jogomemoriabackend.utils.MessageUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.io.IOException;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tb_images")
public class Image extends AbstractEntity {

    @NotEmpty
    @Column(name = "name", unique = true, length = 25)
    private String name;

    @PostPersist
    @PostUpdate
    private void postSave() {

        FileUtils.FILES.forEach((key, value) -> {

            try {
                FileUtils.save(key, value, FileUtils.IMAGES_DIRECTORY);
            } catch (IOException ex) {
                ex.printStackTrace();
                throw new OperationFailureException(MessageUtils.OPERATION_FAILURE);
            }
        });

        FileUtils.FILES.clear();
    }

    @PostRemove
    private void postDelete() {
        FileUtils.delete(name, FileUtils.IMAGES_DIRECTORY);
    }
}