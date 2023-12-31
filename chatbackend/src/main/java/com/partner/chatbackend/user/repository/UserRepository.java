package com.partner.chatbackend.user.repository;

import com.partner.chatbackend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String username);

    @Modifying(clearAutomatically = true) // update , delete Query시 @Modifying 어노테이션, nativeQuery = true 추가
    @Query(value = "UPDATE TB_USERS SET REFRESH_TOKEN = :refreshToken where USER_Id = :userId", nativeQuery = true)
    void update(@Param(value = "refreshToken") String refreshToken, @Param(value = "userId") Long userId);

    @Query(value = "SELECT * FROM TB_USERS WHERE USER_EMAIL = :userEmail", nativeQuery = true)
    User findByRefreshToken(@Param("userEmail") String userEmail);

    Optional<User> findByProviderId(String providerId);

    Long countByUserEmail(String userEmail);

    @Modifying
    @Query(value = "UPDATE TB_USERS " +
            "          SET USER_NAME = :#{#user.userName}," +
            "              USER_EMAIL = :#{#user.userEmail}," +
            "              USER_PHONE = :#{#user.userPhone}," +
            "              GENDER = :#{#user.gender}," +
            "              USER_BIRTH_DAY = :#{#user.userBirthDay} " +
            "        WHERE USER_ID = :#{#user.id} ", nativeQuery = true)
    int updateOauth2KakaoRegister(@Param("user")User user);
}
