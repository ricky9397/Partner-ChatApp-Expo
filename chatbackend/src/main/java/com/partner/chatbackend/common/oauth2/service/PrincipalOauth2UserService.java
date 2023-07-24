package com.partner.chatbackend.common.oauth2.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId();

        System.out.println("####################PrincipalOauth2UserService#####################");
        System.out.println("PrincipalOauth2UserService : " + userRequest);
        System.out.println("provider : " + provider);
        System.out.println("getAttributes : " + oAuth2User.getAttributes());
        System.out.println("getAttributes : " + oAuth2User.getName());

        return super.loadUser(userRequest);
    }

}
