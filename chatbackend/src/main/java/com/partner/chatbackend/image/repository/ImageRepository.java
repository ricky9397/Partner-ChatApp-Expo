package com.partner.chatbackend.image.repository;

import com.partner.chatbackend.image.domain.ImageList;
import com.partner.chatbackend.profile.domain.Profile;
import com.partner.chatbackend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Profile, Long> {

    @Query(value = "" +
            "SELECT A.PROFILE_ID AS profileId" +
            "      ,A.IMAGE_ID AS imageId" +
            "      ,A.IMAGE_NAME AS imageName " +
            "      ,A.IMAGE_PATH AS imagePath" +
            "      ,A.IMAGE_PATH2 AS imagePath2" +
            " FROM TB_PROFILE A", nativeQuery = true)
    List<ImageList> findByImageList(User user);
}
