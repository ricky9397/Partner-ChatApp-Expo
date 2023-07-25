package com.partner.chatbackend.common.oauth2.handler;

import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if(principal instanceof OAuth2User){
            if(principal instanceof OidcUser){

//                 google
//                                            PrincipalOauth2User googleUser = PrincipalOauth2User.OAuth2Provider.google.convert((OAuth2User) principal);
//                                            UserDetail user = UserSecurityService.loadUser(googleUser);
//                                            SecurityContextHolder.getContext().setAuthentication(
//                                                    new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities())
//                                            );
            } else {
                // kakao
                String kakaoId = String.valueOf(((OAuth2User) principal).getAttributes().get("id"));
                User user = userRepository.findByProviderId(kakaoId).orElseThrow(() -> new AuthenticationCredentialsNotFoundException("회원 인증을 실패하였습니다."));
                

            }
        }
    }
}
