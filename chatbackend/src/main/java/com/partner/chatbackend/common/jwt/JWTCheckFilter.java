package com.partner.chatbackend.common.jwt;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.partner.chatbackend.common.cm.Constants;
import com.partner.chatbackend.common.redis.RefreshToken;
import com.partner.chatbackend.common.redis.RefreshTokenRepository;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.user.domain.UserDetail;
import com.partner.chatbackend.user.service.UserSecurityService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 1.인증요청이 있을때 요청하는 것이 아님..
// 2.시큐리티가 filter 가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있다.
// 3.권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무저건 타게 되어있음.
// 4.만약에 권한이 인증이 필요한 주소가 아니라면 이필터를 안탄다.
public class JWTCheckFilter extends BasicAuthenticationFilter {

    private final UserSecurityService userSecurityService;
    private final RefreshTokenRepository refreshTokenRepository;

    public JWTCheckFilter(AuthenticationManager authenticationManager, UserSecurityService userSecurityService, RefreshTokenRepository refreshTokenRepository) {
        super(authenticationManager);
        this.userSecurityService = userSecurityService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String path = request.getServletPath();
        // 로그인일 경우 건너뛰기
        if(path.startsWith("/api/v1/auth/emailCheck") || path.startsWith("/api/v1/auth/register/emai")) {
            chain.doFilter(request, response);
            return;
        }

        String authToken = request.getHeader(Constants.AUTH_TOKEN);
        String refreshToken = request.getHeader(Constants.REFRESH_TOKEN);
        logger.info("#####################################Token 체크 시작##########################################");
        logger.info(request.getHeaderNames());
        // header가 있는지 확인
        if (authToken == null || authToken.equals("undefined") || !authToken.startsWith("Bearer ")) {
            logger.info("토큰이 null, undefined, Bearer 가없습니다.");
            chain.doFilter(request, response);
            return;
        }
        // JWT 토큰을 검증을 해서 정상적인 사용자인지 확인
        String token = authToken.substring("Bearer ".length());
        VerifyResult authVerifyResult = JWTUtil.verify(token);

        // Header 로 받은 auth_token을 verify 체크 후 만료되었을경우 에러
        if (!authVerifyResult.isSuccess()) {
            logger.info("authToken 토큰 만료 refreshToken 체크 후 authToken 신규 발행");

            if(!Utils.isNull(refreshToken)) {
                RefreshToken refreshTokenCheck = refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new IllegalArgumentException("리플레쉬 토큰 만료"));
                VerifyResult refreshVerifyResult = JWTUtil.verify(refreshToken);

                if(refreshVerifyResult.isSuccess() && refreshTokenCheck != null) {
                    response.setHeader(Constants.AUTH_TOKEN, JWTUtil.makeAuthToken(refreshVerifyResult.getUsername()));
                    setAuthentication(refreshVerifyResult.getUsername());

                } else {
                    throw new TokenExpiredException("auth 토큰 재발행 실패");
                }
            }

        } else {
            setAuthentication(authVerifyResult.getUsername());
        }
        chain.doFilter(request, response);
    }


    /**
     * Jwt 토큰 서명을 통해 인증해주는 함수 ( 문이라고 생각하면 됨 )
     * @param userName
     */
    private void setAuthentication(String userName) {
        // auth_token이 만료가 되지 않았을 경우
        UserDetail userDetail = (UserDetail) userSecurityService.loadUserByUsername(userName);
        // JWT 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어 준다.
        UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(userDetail.getUsername(), null, userDetail.getAuthorities());
        // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장.
        SecurityContextHolder.getContext().setAuthentication(userToken);
    }


}
