package com.partner.chatbackend.common.jwt;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        // 로그인일 경우 건너뛰기
        if(path.startsWith("/oauth2/**")) {
            System.out.println("oauth2 로그인~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        } else {
            System.out.println("oauth2 로그인아님~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }

    }
}
