package com.partner.chatbackend.matching.repository;

import com.partner.chatbackend.matching.domain.BeforeMatching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchingRepository extends JpaRepository<BeforeMatching, Long> {

    @Query(value = "SELECT * FROM TB_BF_MATCHING WHERE MAN_ID = :#{#bf.manId} AND WOMEN_ID = :#{#bf.womenId}", nativeQuery = true)
    BeforeMatching findByMatching(@Param("bf") BeforeMatching beforeMatching);

//    @Modifying
//    @Query(value = "UPDATE TB_BF_MATCHING SET LIKE_YN = 'Y' WHERE FROM_ID = :fromId", nativeQuery = true)
//    void update(@Param(value = "fromId") Long fromId);
}
