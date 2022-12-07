package io.github.edson.jogomemoriabackend.infrastructure.controller;

import io.github.edson.jogomemoriabackend.infrastructure.exception.ObjectNotFoundException;
import io.github.edson.jogomemoriabackend.infrastructure.exception.OperationFailureException;
import io.github.edson.jogomemoriabackend.infrastructure.exception.StandardError;
import io.github.edson.jogomemoriabackend.infrastructure.exception.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity methodArgumentNotValidException (MethodArgumentNotValidException ex, HttpServletRequest request) {

        List<StandardError> errors = ex.getBindingResult().getAllErrors().stream().map(error ->
                new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Bad Request", error.getDefaultMessage(), request.getRequestURI())
        ).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    @ExceptionHandler(ObjectNotFoundException.class)
    public ResponseEntity objectNotFound(ObjectNotFoundException ex, HttpServletRequest request) {

        StandardError error = new StandardError(System.currentTimeMillis(), HttpStatus.NOT_FOUND.value(), "Not Found", ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Arrays.asList(error));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity validationException(ValidationException ex, HttpServletRequest request) {

        StandardError error = new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Bad Request", ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Arrays.asList(error));
    }

    @ExceptionHandler(OperationFailureException.class)
    public ResponseEntity operationFailureException(OperationFailureException ex, HttpServletRequest request) {

        StandardError error = new StandardError(System.currentTimeMillis(), HttpStatus.FORBIDDEN.value(), "Forbidden", ex.getMessage(), request.getRequestURI());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Arrays.asList(error));
    }
}