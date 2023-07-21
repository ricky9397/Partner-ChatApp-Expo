package com.partner.chatbackend.matching.repository;

import com.partner.chatbackend.chatting.domain.ChatList;
import com.partner.chatbackend.matching.domain.AfterMatching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AfterMatchingRepository extends JpaRepository<AfterMatching, Long> {

    @Query(value = "" +
            "SELECT A.MATCHING_ID AS matchingId " +
            "     , B.USER_ID AS id " +
            "     , B.IMAGE_PATH AS imagePath" +
            "     , C.USER_NAME AS username" +
            "     , D.SEND_MESSAGE AS sendMessage" +
            "     , D.REG_DATE AS regDate" +
//            "     , ( CASE " +
//            "         WHEN DATE_FORMAT(D.REG_DATE, '%Y/%m/%d') = DATE_FORMAT(SYSDATE() , '%Y/%m/%d')" +
//            "         THEN DATE_FORMAT(D.REG_DATE, '%H:%i') " +
//            "         WHEN DATE_FORMAT(D.REG_DATE, '%Y/%m/%d') = DATE_FORMAT(SYSDATE() - INTERVAL 1 DAY, '%Y/%m/%d')" +
//            "         THEN '어제'" +
//            "         ELSE DATE_FORMAT(D.REG_DATE, '%Y/%m/%d')" +
//            "         END ) AS regDate" +
            "  FROM TB_AF_MATCHING A" +
            "  JOIN TB_PROFILE B" +
            "    ON A.WOMEN_ID = B.USER_ID " +
            "  JOIN TB_USERS C " +
            "    ON A.WOMEN_ID = C.USER_ID" +
            "  LEFT JOIN TB_MESSAGE D" +
            "    ON D.MATCHING_ID = A.MATCHING_ID " +
            "   AND D.REG_DATE IN ( SELECT MAX(REG_DATE) FROM TB_MESSAGE WHERE D.MATCHING_ID = MATCHING_ID)" +
            " WHERE A.MAN_ID = :id ", nativeQuery = true)
    List<ChatList> findByWomenChatList(@Param("id") Long id );

    @Query(value = "" +
            "SELECT A.MATCHING_ID AS matchingId " +
            "     , B.USER_ID AS id " +
            "     , B.IMAGE_PATH AS imagePath" +
            "     , C.USER_NAME AS userName" +
            "     , D.SEND_MESSAGE AS sendMessage" +
            "     , D.REG_DATE AS regDate" +
//            "     , ( CASE " +
//            "         WHEN DATE_FORMAT(D.REG_DATE, '%Y/%m/%d') = DATE_FORMAT(SYSDATE() , '%Y/%m/%d')" +
//            "         THEN DATE_FORMAT(D.REG_DATE, '%H:%i') " +
//            "         WHEN DATE_FORMAT(D.REG_DATE, '%Y/%m/%d') = DATE_FORMAT(SYSDATE() - INTERVAL 1 DAY, '%Y/%m/%d')" +
//            "         THEN '어제'" +
//            "         ELSE DATE_FORMAT(D.REG_DATE, '%Y/%m/%d')" +
//            "         END ) AS regDate" +
            "  FROM TB_AF_MATCHING A" +
            "  JOIN TB_PROFILE B" +
            "    ON A.MAN_ID = B.USER_ID " +
            "  JOIN TB_USERS C " +
            "    ON A.MAN_ID = C.USER_ID" +
            "  LEFT JOIN TB_MESSAGE D" +
            "    ON D.MATCHING_ID = A.MATCHING_ID " +
            "   AND D.REG_DATE IN ( SELECT MAX(REG_DATE) FROM TB_MESSAGE WHERE D.MATCHING_ID = MATCHING_ID)" +
            " WHERE A.WOMEN_ID = :id ", nativeQuery = true)
    List<ChatList> findByManChatList(@Param("id") Long id );
}
