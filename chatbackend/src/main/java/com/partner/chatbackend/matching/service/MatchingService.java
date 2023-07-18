package com.partner.chatbackend.matching.service;

import com.partner.chatbackend.matching.domain.BeforeMatching;
import com.partner.chatbackend.matching.repository.AfterMatchingRepository;
import com.partner.chatbackend.matching.repository.MatchingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatchingService {

    private final MatchingRepository matchingRepository;
    private final AfterMatchingRepository afterMatchingRepository;

    public void addLike(BeforeMatching beforeMatching) {
        matchingRepository.save(beforeMatching);
    }

    public BeforeMatching findByMatching(BeforeMatching beforeMatching) {
        return matchingRepository.findByMatching(beforeMatching);
    }

//    public void addMatching(Long fromId) {
//        matchingRepository.update(fromId);
//    }
}
