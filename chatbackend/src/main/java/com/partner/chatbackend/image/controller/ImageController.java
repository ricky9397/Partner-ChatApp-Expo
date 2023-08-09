package com.partner.chatbackend.image.controller;

import com.partner.chatbackend.chatting.domain.ChatList;
import com.partner.chatbackend.image.domain.ImageList;
import com.partner.chatbackend.image.service.ImageService;
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
@RequestMapping("/api/v2/images")
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/imageList")
    public ResponseEntity<List<ImageList>> getAfterMatchingRoom(@RequestBody User user, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        List<ImageList> imageLists = imageService.getImageList(user);
        return new ResponseEntity<>(imageLists, HttpStatus.OK);
    }



}
