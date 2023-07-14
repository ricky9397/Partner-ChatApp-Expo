package com.partner.chatbackend.user.controller;

import com.partner.chatbackend.common.cm.Constants;
import com.partner.chatbackend.common.security.JWTUtil;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.service.UserSecurityService;
import com.partner.chatbackend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth2")
public class Oauth2Controller {

    private final UserService userService;
    private final UserSecurityService userSecurityService;

    /**
     * OAuth2 로그인 / 회원가입 {urlid} = (구글, 네이버, 카카오)
     * @param data
     * @param response
     * @return
     * @throws Exception
     */
    @PostMapping("/login/{urlid}")
    public ResponseEntity<?> LoginWithGoogleOauth2(@PathVariable("urlid") String urlid, @RequestBody Map<String, Object> data, HttpServletResponse response) throws Exception {
        User user;
        Optional<User> userInfo = userService.findByUserEmail((String) data.get("email"));

        if (userInfo.isEmpty()) {
            // 정보가 없을 경우 자동 구글 회원가입
            user = userService.save(data);
        } else {
            user = userInfo.get();
        }
        String refreshToken = JWTUtil.makeRefreshToken(user);
        userSecurityService.updateRefreshToken(refreshToken, user.getId());

        response.setHeader(Constants.REFRESH_TOKEN, refreshToken);
        response.setHeader(Constants.AUTH_TOKEN, JWTUtil.makeAuthToken(user));
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
