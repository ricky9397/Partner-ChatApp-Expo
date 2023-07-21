package com.partner.chatbackend.user.domain;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
public class UserDetail implements UserDetails, OAuth2User {

    private User user;
    private Map<String, Object> attributes;

    public UserDetail(User user) {
        this.user = user;
    }

    public UserDetail(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    // pk값
    @Override
    public String getUsername() {
        return user.getUserEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> user.getRole());
        return collection;
    }

    // 비밀번호
    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    // 계정 만료 여부
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠김여부
    @Override
    public boolean isAccountNonLocked() {
        // userLockedYn = Y일 경우 계정락 걸려있음.
        return user.getLockedYn().equals("N") ? true : false;
    }

    // 비밀번호 만료여부.
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 사용자 활성화 여부. true: 활성, false : 비활성
    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
    @Override
    public String getName() {
        String sub = attributes.get("sub").toString();
        return sub;
    }
}
