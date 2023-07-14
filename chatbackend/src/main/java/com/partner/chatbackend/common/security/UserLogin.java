package com.partner.chatbackend.common.security;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserLogin {

    private Long userId;
    private String userEmail;
    private String userPassword;
    private String refreshToken;
    private boolean rememberme;

}
