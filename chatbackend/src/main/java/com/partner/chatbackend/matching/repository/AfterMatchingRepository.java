package com.partner.chatbackend.matching.repository;

import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AfterMatchingRepository extends JpaRepository<AfterMatching, Long> {


    @Query("SELECT *" +
            " FROM TB_USERS A" +
            " JOIN TB_AF_MATCHING B" +
            "   ON A.ID = B.")
    User findByUser(AfterMatching afterMatching);
}
