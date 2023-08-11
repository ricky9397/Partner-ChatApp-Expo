package com.partner.chatbackend.profile.controller;

import com.partner.chatbackend.profile.domain.ImageList;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.profile.service.ProfileService;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<?> profileImageSave(@RequestPart(value = "files",required = false) MultipartFile multipartFile) {
//        profileService.profileImageSave(multipartHttpServletRequest);
        return null;
    }
    @PostMapping("/imagesSave2")
    public ResponseEntity<?> profileImageSave2(@RequestParam("files") MultipartFile file) {
        System.out.println(file.getOriginalFilename());
//        profileService.profileImageSave(multipartHttpServletRequest);
        return null;
    }
    @PostMapping("/imagesSave3")
    public ResponseEntity<?> profileImageSave3(MultipartHttpServletRequest multipartHttpServletRequest) {
        List<MultipartFile> fileList = multipartHttpServletRequest.getFiles("files");
        System.out.println(fileList);
//        profileService.profileImageSave(multipartHttpServletRequest);
        return null;
    }


}
