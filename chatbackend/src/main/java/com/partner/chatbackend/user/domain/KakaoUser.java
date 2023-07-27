package com.partner.chatbackend.user.domain;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoUser {

    private Long id;
    private String userEmail;
    private String userName;
    private String userPhone;
    private String gender;
    private String lockedYn;
    private String provider;

}
