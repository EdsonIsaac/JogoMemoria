
CREATE TABLE tb_cards (
   id UUID NOT NULL,
   created_date TIMESTAMP WITHOUT TIME ZONE,
   last_modified_date TIMESTAMP WITHOUT TIME ZONE,
   created_by_user VARCHAR(50),
   modified_by_user VARCHAR(50),
   image_id UUID,
   CONSTRAINT pk_tb_cards PRIMARY KEY (id)
);

CREATE TABLE tb_images (
   id UUID NOT NULL,
   created_date TIMESTAMP WITHOUT TIME ZONE,
   last_modified_date TIMESTAMP WITHOUT TIME ZONE,
   created_by_user VARCHAR(50),
   modified_by_user VARCHAR(50),
   name VARCHAR(25),
   CONSTRAINT pk_tb_images PRIMARY KEY (id)
);

CREATE TABLE tb_users (
   id UUID NOT NULL,
   created_date TIMESTAMP WITHOUT TIME ZONE,
   last_modified_date TIMESTAMP WITHOUT TIME ZONE,
   created_by_user VARCHAR(50),
   modified_by_user VARCHAR(50),
   name VARCHAR(100) NOT NULL,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL,
   enabled BOOLEAN NOT NULL,
   department VARCHAR(25) NOT NULL,
   photo_id UUID,
   CONSTRAINT pk_tb_users PRIMARY KEY (id)
);

ALTER TABLE tb_images ADD CONSTRAINT uc_tb_images_name UNIQUE (name);

ALTER TABLE tb_users ADD CONSTRAINT uc_tb_users_username UNIQUE (username);

ALTER TABLE tb_cards ADD CONSTRAINT FK_TB_CARDS_ON_IMAGE FOREIGN KEY (image_id) REFERENCES tb_images (id);

ALTER TABLE tb_users ADD CONSTRAINT FK_TB_USERS_ON_PHOTO FOREIGN KEY (photo_id) REFERENCES tb_images (id);