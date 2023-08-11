package com.partner.chatbackend.profile.controller;

import com.partner.chatbackend.profile.domain.ImageList;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.profile.service.ProfileService;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/profile")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/imageList")
    public ResponseEntity<List<ImageList>> getAfterMatchingRoom(@RequestBody User user, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        List<ImageList> imageLists = profileService.getImageList(user);
        return new ResponseEntity<>(imageLists, HttpStatus.OK);
    }

    @PostMapping("/imagesSave")
    public ResponseEntity<?> profileImageSave(@RequestParam("files") MultipartFile[] file) {
        profileService.profileSave(file);
        return null;
    }


}
