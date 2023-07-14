package com.partner.chatbackend.user.service;

import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.domain.UserDetail;
import com.partner.chatbackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSecurityService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override // 시큐리티 session(내부 Authentication(내부 UserDetails))
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByUserEmail(username).orElseThrow(()->new IllegalArgumentException(username+" 사용자가 존재하지 않습니다"));
        return new UserDetail(userEntity);
    }

    // 토큰 저장
    public void updateRefreshToken(String refreshToken, Long userId) {
        userRepository.update(refreshToken, userId); // 리플래쉬토큰 저장
    }

    // 토큰 체크
    public User findByRefreshToken(Long userId) {
        return userRepository.findByRefreshToken(userId);
    }



}
