package com.partner.chatbackend.matching.controller;

import com.partner.chatbackend.common.rest.RestData;
import com.partner.chatbackend.common.utils.Utils;
import com.partner.chatbackend.matching.domain.BeforeMatching;
import com.partner.chatbackend.matching.service.AfterMatchingService;
import com.partner.chatbackend.matching.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/matching")
public class MatchingController extends Utils {

    private final MatchingService matchingService;
    private final AfterMatchingService afterMatchingService;

    @PostMapping("/addLike")
    public ResponseEntity<RestData> addLike(@RequestBody BeforeMatching beforeMatching) {

        BeforeMatching matchings = matchingService.findByMatching(beforeMatching);

        try {
            if(Utils.isEmpty(matchings)) {
                // 매칭전 테이블 저장
                matchingService.addLike(beforeMatching);
            } else {
                // TODO TB_AF_MATCHING 저장(채팅방 생성) -> 사용자에게 매칭성공 return
                // 매칭테이블 저장
                afterMatchingService.addAfterMatching(matchings);
            }
            return Utils.spring.responseEntityOf(RestData.of(200, "매칭성공"));
        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
            return Utils.spring.responseEntityOf(RestData.of(500, "매칭성공", e.getMessage()));
        }

    }

}
