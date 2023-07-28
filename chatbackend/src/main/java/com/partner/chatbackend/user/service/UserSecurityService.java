package com.partner.chatbackend.user.service;

import com.partner.chatbackend.common.exception.AuthenticationUserException;
import com.partner.chatbackend.common.exception.ErrorCode;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.domain.UserDetail;
import com.partner.chatbackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserSecurityService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override // 시큐리티 session(내부 Authentication(내부 UserDetails))
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByUserEmail(username).orElseThrow(()->new IllegalArgumentException(username + " 사용자가 존재하지 않습니다"));
        return new UserDetail(userEntity);
    }

    public User register(User user){
        user.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));
        user.setUserPhone(bCryptPasswordEncoder.encode(user.getUserPhone()));
        Long id = userRepository.save(user).getId();

        if(id == 0)
            throw new AuthenticationUserException(ErrorCode.USERNAME_DUPLICATED, "회원가입 실패 하였습니다.");

        User resultUser = userRepository.findById(id).orElseThrow(() -> new AuthenticationUserException(ErrorCode.USERNAME_DUPLICATED, "사용자가 존재하지 않습니다."));
        return resultUser;
    }

    // 토큰 저장
    public void updateRefreshToken(String refreshToken, Long userId) {
        userRepository.update(refreshToken, userId); // 리플래쉬토큰 저장
    }

    // 토큰 체크
    public User findByRefreshToken(String userEmail) {
        return userRepository.findByRefreshToken(userEmail);
    }


    public Long countByUserEmail(String userEmail) {
        return userRepository.countByUserEmail(userEmail);
    }

    public User oauth2Register(User user) {
        user.setUserPhone(bCryptPasswordEncoder.encode(user.getUserPhone()));

        int cnt = userRepository.updateOauth2KakaoRegister(user); // 리플래쉬토큰 저장

        if(cnt == 0)
            throw new AuthenticationUserException(ErrorCode.USERNAME_DUPLICATED, "회원가입 실패 하였습니다.");

        User resultUser = userRepository.findByUserEmail(user.getUserEmail()).orElseThrow(() -> new AuthenticationUserException(ErrorCode.USERNAME_DUPLICATED, "사용자가 존재하지 않습니다."));
        return resultUser;
    }
}
