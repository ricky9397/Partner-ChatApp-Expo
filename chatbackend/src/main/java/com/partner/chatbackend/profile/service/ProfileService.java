package com.partner.chatbackend.profile.service;

import com.partner.chatbackend.profile.domain.ImageList;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.profile.repository.ProfileRepository;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public List<ImageList> getImageList(User user) {
        return profileRepository.findByImageList(user);
    }

}
