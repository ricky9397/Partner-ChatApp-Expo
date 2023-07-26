package com.partner.chatbackend.user.controller;

import com.partner.chatbackend.common.exception.AuthenticationUserException;
import com.partner.chatbackend.common.exception.ErrorCode;
import com.partner.chatbackend.common.rest.RestData;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.service.UserSecurityService;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/")
public class UserController {

    private final UserSecurityService userSecurityService;

    /**+
     * 관리자, 유저 회원가입
     * 
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping("/register")
    public ResponseEntity<RestData> register(@RequestBody User user) {
        Long result = userSecurityService.register(user);
        if(result == 0) {
            throw new AuthenticationUserException(ErrorCode.USERNAME_DUPLICATED, "로그인 실패하였습니다.");
        }
        return Utils.spring.responseEntityOf(RestData.of(200, "회원가입 성공 하였습니다."));
    }

    @PostMapping("/emailCheck")
    public ResponseEntity<RestData> getEmailCheck(@RequestBody User user) {

        Long cnt = userSecurityService.countByUserEmail(user.getUserEmail());

        System.out.println(cnt);

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
