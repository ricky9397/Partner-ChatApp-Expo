package com.partner.chatbackend.user.repository;

import com.partner.chatbackend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String username);

    @Modifying // update , delete Query시 @Modifying 어노테이션, nativeQuery = true 추가
    @Query(value = "UPDATE TB_USERS SET REFRESH_TOKEN = :refreshToken where USER_Id = :userId", nativeQuery = true)
    void update(@Param(value = "refreshToken") String refreshToken, @Param(value = "userId") Long userId);

    @Query(value = "SELECT * FROM TB_USERS WHERE USER_ID = :userId", nativeQuery = true)
    User findByRefreshToken(@Param("userId") Long userId);

}
