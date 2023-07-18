package com.partner.chatbackend.matching.controller;

import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.matching.service.AfterMatchingService;
import com.partner.chatbackend.user.domain.User;
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
public class AfterMatchingController {

    private final AfterMatchingService afterMatchingService;

    @PostMapping("/room")
    public ResponseEntity<User> getAfterMatchingRoom(@RequestBody AfterMatching afterMatching) {
        return new ResponseEntity<>(afterMatchingService.getAfterMatchingRoom(afterMatching), HttpStatus.OK);
    }


}
