package com.partner.chatbackend.common.oauth2.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        System.out.println("test```````````````````````````````");
        System.out.println("onAuthenticationSuccess" + principal);
        System.out.println(authentication.getAuthorities());
//        if(principal instanceof OAuth2User){
//            if(principal instanceof OidcUser){
//
////                 google
//                                            PrincipalOauth2User googleUser = PrincipalOauth2User.OAuth2Provider.google.convert((OAuth2User) principal);
//                                            UserDetail user = UserSecurityService.loadUser(googleUser);
//                                            SecurityContextHolder.getContext().setAuthentication(
//                                                    new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities())
//                                            );
//            } else {
//                // naver, kakao
//            }
//        }
    }
}
