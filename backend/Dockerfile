FROM openjdk:latest

VOLUME /tmp

ADD ./target/jogo-memoria-backend-1.0.0.jar jogomemoria-api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/jogomemoria-api.jar"]