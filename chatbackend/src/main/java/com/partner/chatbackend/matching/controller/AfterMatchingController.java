package com.partner.chatbackend.matching.controller;

import com.partner.chatbackend.chatting.domain.ChatList;
import com.partner.chatbackend.common.rest.RestData;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.matching.service.AfterMatchingService;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/matching")
public class AfterMatchingController {

    private final AfterMatchingService afterMatchingService;

    /**
     * 채팅 목록 리스트
     *
     * @param user
     * @return
     */
    @PostMapping("/chatList")
    public ResponseEntity<List<ChatList>> getAfterMatchingRoom(@RequestBody User user, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        List<ChatList> chatLists = afterMatchingService.getAfterMatchingRoomList(user);
        return new ResponseEntity<>(chatLists, HttpStatus.OK);
    }

    /**
     * 매칭 성공 후 성공 메신저와 나와 상대방 프로필 페이지정보 조회
     * @param afterMatching
     * @return
     */
    @PostMapping("/afMatching")
    public ResponseEntity<RestData> getAfterMatching(@RequestBody AfterMatching afterMatching) {
        List<Profile> profile = afterMatchingService.getMatchingProfile(afterMatching);
        return Utils.spring.responseEntityOf(RestData.of(200, "매칭 성공", profile));
    }

}
