package com.partner.chatbackend.matching.controller;

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
    public ResponseEntity<?> addLike(@RequestBody BeforeMatching beforeMatching) {

        BeforeMatching matchings = matchingService.findByMatching(beforeMatching);

        try {

            if(matchings == null) {
                matchingService.addLike(beforeMatching);
                return new ResponseEntity<>("성공", HttpStatus.OK);
            } else {
                // TODO TB_BF_MATCHING 테이블 데이터 삭제 로직
                // TODO 삭제 -> TB_AF_MATCHING 저장(채팅방 생성) -> 사용자에게 매칭성공 return
//                matchingService.addMatching(fromId);
                afterMatchingService.addAfterMatching(matchings);
                return new ResponseEntity<>("성공", HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }

    }

}
