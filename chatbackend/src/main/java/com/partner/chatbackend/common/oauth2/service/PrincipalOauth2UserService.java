package com.partner.chatbackend.common.oauth2.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Map;

import static org.springframework.data.util.Optionals.ifPresentOrElse;

@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId();

        if(provider.equals("kakao")) {
            String kakaoId = oAuth2User.getName();
            String userEmail;

            try {
                userEmail = Utils.getStringJsonParser(oAuth2User.getAttributes().get("kakao_account"), "email");
            } catch (Exception e) {
                throw new RuntimeException("json 파싱 에러");
            }

            Iterator<? extends GrantedAuthority> iterator = (oAuth2User.getAuthorities()).iterator();

            String role = iterator.next().getAuthority();

            ifPresentOrElse(userRepository.findByProviderId(kakaoId),
                    user -> user.setRole(role),
                    () -> userRepository.save(User.builder()
                                    .userEmail(userEmail)
                                    .role(role)
                                    .providerId(kakaoId)
                                    .provider(provider)
                                    .build())
            );
        }
        return oAuth2User;
    }
}
