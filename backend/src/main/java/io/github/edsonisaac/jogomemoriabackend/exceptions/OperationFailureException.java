package io.github.edsonisaac.jogomemoriabackend.exceptions;

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