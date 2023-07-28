package com.partner.chatbackend.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.partner.chatbackend.common.cm.Constants;
import com.partner.chatbackend.common.jwt.JWTUtil;
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
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**+
     * 관리자, 유저 회원가입
     * 
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping("/register/{urlId}")
    public ResponseEntity<RestData> register(@PathVariable("urlId") String urlId, @RequestBody User user, HttpServletRequest request, HttpServletResponse response) throws IOException {




        User result;
        if(urlId.equals("email")) {
            result = userSecurityService.register(user);
        } else {
            result = userSecurityService.oauth2Register(user);
        }

        String refreshToken = JWTUtil.makeRefreshToken(result.getUserEmail());
        String authToken = JWTUtil.makeAuthToken(result.getUserEmail());

        userSecurityService.updateRefreshToken(refreshToken, result.getId()); // 로그인 성공 후 토큰 DB저장.

        response.setHeader(Constants.REFRESH_TOKEN, refreshToken);
        response.setHeader(Constants.AUTH_TOKEN, authToken);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("user", result);
        response.getOutputStream().write(objectMapper.writeValueAsBytes(resultMap));

        return Utils.spring.responseEntityOf(RestData.of(200, "회원가입 성공 하였습니다.", result));
    }


    @PostMapping("/emailCheck")
    public ResponseEntity<RestData> getEmailCheck(@RequestBody User user) {
        Long cnt = userSecurityService.countByUserEmail(user.getUserEmail());
        return Utils.spring.responseEntityOf(RestData.successOf(cnt));
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
        if (!Utils.isEmpty(user)) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }


}
