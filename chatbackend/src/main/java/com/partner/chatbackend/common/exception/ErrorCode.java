package com.partner.chatbackend.common.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USERNAME_DUPLICATED(HttpStatus.CONFLICT, "");
    private HttpStatus httpStatus;
    private String message;
}
