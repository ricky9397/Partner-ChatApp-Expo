package com.partner.chatbackend.matching.service;

import com.partner.chatbackend.chatting.domain.ChatList;
import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.matching.domain.BeforeMatching;
import com.partner.chatbackend.matching.repository.AfterMatchingRepository;
import com.partner.chatbackend.user.domain.Profile;
import com.partner.chatbackend.user.domain.User;
import com.partner.chatbackend.user.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AfterMatchingService {

    private final AfterMatchingRepository afterMatchingRepository;
    private final ProfileRepository profileRepository;

    public void addAfterMatching(BeforeMatching matchings) {
        AfterMatching afterMatching = AfterMatching.builder()
                .manId(matchings.getManId())
                .womenId(matchings.getWomenId())
                .build();
        afterMatchingRepository.save(afterMatching);
    }

    public List<Profile> getMatchingProfile(AfterMatching afterMatching) {
        return profileRepository.findByProfile(afterMatching);
    }

    public List<ChatList> getAfterMatchingRoomList(User user) {
        if(user.getGender().equals("M")) {
            return afterMatchingRepository.findByWomenChatList(user.getId());
        } else {
            return afterMatchingRepository.findByManChatList(user.getId());
        }
    }
}
