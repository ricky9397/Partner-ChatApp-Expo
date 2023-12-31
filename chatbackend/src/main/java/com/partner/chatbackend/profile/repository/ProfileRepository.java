package com.partner.chatbackend.profile.repository;

import com.partner.chatbackend.profile.domain.ImageList;
import com.partner.chatbackend.matching.domain.AfterMatching;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query(value = "SELECT A.USER_ID ,A.IMAGE_NAME ,A.IMAGE_PATH " +
            " FROM (" +
            "    SELECT USER_ID, IMAGE_NAME, IMAGE_PATH " +
            "      FROM TB_PROFILE" +
            "     WHERE USER_ID = :#{#af.manId}" +
            "     UNION ALL " +
            "    SELECT USER_ID, IMAGE_NAME, IMAGE_PATH " +
            "      FROM TB_PROFILE" +
            "     WHERE USER_ID = :#{#af.womenId}" +
            "  ) A ", nativeQuery = true)
    List<Profile> findByProfile(@Param(value = "af") AfterMatching afterMatching);

    @Query(value = "SELECT A.PROFILE_ID AS profileId" +
                    "      ,A.FILE_NO AS fileNo" +
                    "      ,A.FILE_NAME AS fileName " +
                    "      ,A.FILE_PATH AS filePath" +
//                    "      ,A.IMAGE_PATH2 AS imagePath2" +
                    " FROM TB_PROFILE A", nativeQuery = true)
    List<ImageList> findByImageList(User user);


}
