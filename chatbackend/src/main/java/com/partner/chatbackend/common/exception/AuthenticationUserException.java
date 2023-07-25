package com.partner.chatbackend.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AuthenticationUserException extends RuntimeException{

    private ErrorCode errorCode;
    private String message;

}
