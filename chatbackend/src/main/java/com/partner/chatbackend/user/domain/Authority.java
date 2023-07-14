package com.partner.chatbackend.user.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "TB_AUTHORITY")
@IdClass(Authority.class)
public class Authority implements GrantedAuthority {

    public static final String ROLE_USER = "ROLE_USER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final Authority USER_AUTHORITY = Authority.builder().authority(ROLE_USER).build();
    public static final Authority ADMIN_AUTHORITY = Authority.builder().authority(ROLE_ADMIN).build();

    @Id
    @Column(name = "USER_ID")
    private Long id;

    @Id
    private String authority;

}
