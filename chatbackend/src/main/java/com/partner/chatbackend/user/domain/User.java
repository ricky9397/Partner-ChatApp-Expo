package com.partner.chatbackend.user.domain;

import com.partner.chatbackend.common.cm.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@DynamicInsert
@Table(name = "TB_USERS")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "USER_EMAIL", unique = true)
    private String userEmail;

    @NotNull
    @Column(name = "USER_PASSWORD")
    private String userPassword;

    @NotNull
    @Column(name = "USER_NAME")
    private String userName;

    @NotNull
    @Column(name = "USER_PHONE")
    private String userPhone;

    @NotNull
    @Column(name = "GENDER")
    private String gender;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name ="USER_ID")
    private Set<Authority> authorities;

    @OneToOne
    private Profile profile;

    @ColumnDefault(value = "0")
    @Column(name = "LOGIN_FAIL_CNT")
    private int loginFailCnt;

    @ColumnDefault(value = "'Y'")
    @Column(name = "USER_YN", length = 1)
    private String userYn;

    @ColumnDefault(value = "'N'")
    @Column(name = "LOCKED_YN")
    private String lockedYn;

    @ColumnDefault(value = "'Y'")
    @Column(name = "USE_YN", length = 1)
    private String useYn;

    @ColumnDefault(value = "'ROLE_USER'")
    @Column(name = "ROLE")
    private String role;

    @Column(name = "REFRESH_TOKEN")
    private String refreshToken;

    @Column(name = "PROVIDER_ID", length = 2000)
    private String providerId;

    @Column(name = "PROVIDER")
    private String provider;

    @Builder
    public User(Long id, String userEmail, String userPassword, String userName, String userPhone, String gender, int loginFailCnt, String userYn, String lockedYn, String useYn, String role, String refreshToken, String providerId, String provider) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userName = userName;
        this.userPhone = userPhone;
        this.gender = gender;
        this.loginFailCnt = loginFailCnt;
        this.userYn = userYn;
        this.lockedYn = lockedYn;
        this.useYn = useYn;
        this.role = role;
        this.refreshToken = refreshToken;
        this.providerId = providerId;
        this.provider = provider;
    }
}
