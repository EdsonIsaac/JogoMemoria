package io.github.edson.jogomemoriabackend.infrastructure.exception;

public class OperationFailureException extends RuntimeException {

    public OperationFailureException() {
        super();
    }

    public OperationFailureException(String message) {
        super(message);
    }

    public OperationFailureException(String message, Throwable cause) {
        super(message, cause);
    }
}