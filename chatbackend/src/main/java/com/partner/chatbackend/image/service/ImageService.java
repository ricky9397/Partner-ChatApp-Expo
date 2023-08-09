package com.partner.chatbackend.image.service;

import com.partner.chatbackend.image.domain.ImageList;
import com.partner.chatbackend.image.repository.ImageRepository;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public List<ImageList> getImageList(User user) {
        return imageRepository.findByImageList(user);
    }
}
