package com.partner.chatbackend.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.partner.chatbackend.common.cm.Constants;
import com.partner.chatbackend.common.jwt.JWTUtil;
import com.partner.chatbackend.common.redis.RefreshToken;
import com.partner.chatbackend.common.redis.RefreshTokenRepository;
import com.partner.chatbackend.common.rest.RestData;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.service.UserSecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/")
public class UserController {

    private final UserSecurityService userSecurityService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**+
     * 관리자, 유저 회원가입
     * 
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping("/register/{urlId}")
    public ResponseEntity<Void> register(@PathVariable("urlId") String urlId, @RequestBody User user, HttpServletResponse response) throws IOException {

        User result = urlId.equals("email") ? userSecurityService.register(user) : userSecurityService.oauth2Register(user);

        String refreshToken = JWTUtil.makeRefreshToken(result.getUserEmail());
        String authToken = JWTUtil.makeAuthToken(result.getUserEmail());

        refreshTokenRepository.save(new RefreshToken(refreshToken, result.getId()));

        response.setHeader(Constants.REFRESH_TOKEN, refreshToken);
        response.setHeader(Constants.AUTH_TOKEN, authToken);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("user", result);
        response.getOutputStream().write(objectMapper.writeValueAsBytes(resultMap));

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/emailCheck")
    public ResponseEntity<RestData> getEmailCheck(@RequestBody User user) {
        Long count  = userSecurityService.countByUserEmail(user.getUserEmail());
        return ResponseEntity.ok(RestData.successOf(count));

    }


    /**+
     * 어드민 + 유저 같이 있는 페이지가 있을 경우 적용.
     * 페이지이동시 첫화면 진입 -> 시큐리티 권한체크 및 로그인상태 체크
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping("/check")
    public ResponseEntity<?> getSuccessCheck(@RequestBody User user) throws Exception {
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

}
