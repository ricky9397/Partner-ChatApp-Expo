package com.partner.chatbackend.common.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AuthenticationUserException extends RuntimeException{
    public AuthenticationUserException(String msg) {super(msg);}

}
