package com.partner.chatbackend.matching.service;

import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.matching.domain.BeforeMatching;
import com.partner.chatbackend.matching.repository.AfterMatchingRepository;
import com.partner.chatbackend.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AfterMatchingService {

    private final AfterMatchingRepository afterMatchingRepository;

    public void addAfterMatching(BeforeMatching matchings) {
        AfterMatching afterMatching = AfterMatching.builder()
                .manId(matchings.getManId())
                .womenId(matchings.getWomenId())
                .build();
        afterMatchingRepository.save(afterMatching);
    }

    public User getAfterMatchingRoom(AfterMatching afterMatching) {
        return afterMatchingRepository.findByUser(afterMatching);
    }
}
