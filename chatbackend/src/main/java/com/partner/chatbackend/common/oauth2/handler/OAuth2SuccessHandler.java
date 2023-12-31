package com.partner.chatbackend.common.oauth2.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.partner.chatbackend.common.cm.Constants;
import com.partner.chatbackend.common.jwt.JWTUtil;
import com.partner.chatbackend.user.domain.KakaoUser;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if(principal instanceof OAuth2User){
            if(principal instanceof OidcUser){
                // google
            } else {
                // kakao
                String kakaoId = String.valueOf(((OAuth2User) principal).getAttributes().get("id"));

                User user = userRepository.findByProviderId(kakaoId).orElseThrow(() -> new AuthenticationCredentialsNotFoundException("회원 인증을 실패하였습니다."));

                String authToken = JWTUtil.makeAuthToken(user.getUserEmail());
                String refreshToken = JWTUtil.makeRefreshToken(user.getUserEmail());

                KakaoUser kakaoUser = KakaoUser.builder()
                        .id(user.getId())
                        .userEmail(user.getUserEmail())
                        .userName(user.getUserName())
                        .userPhone(user.getUserPhone())
                        .gender(user.getGender())
                        .lockedYn(user.getLockedYn())
                        .provider(user.getProvider())
                        .build();

                Map<String, Object> resultMap = new HashMap<>();

                resultMap.put("user", kakaoUser);
                resultMap.put(Constants.AUTH_TOKEN, authToken);
                resultMap.put(Constants.REFRESH_TOKEN, refreshToken);

                response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                response.setStatus(HttpStatus.OK.value());
                response.setCharacterEncoding("UTF-8");
                response.getOutputStream().write(
                        objectMapper.writeValueAsBytes(resultMap));
            }
        }
    }
}
