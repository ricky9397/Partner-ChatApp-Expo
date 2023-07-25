package com.partner.chatbackend.user.domain;

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
//    private boolean rememberme;

}
