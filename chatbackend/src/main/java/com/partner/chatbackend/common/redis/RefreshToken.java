package com.partner.chatbackend.common.redis;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.Id;

@Getter
@RedisHash(value = "refreshToken", timeToLive = 60*60*24*7)
public class RefreshToken {

    @Id
    @Indexed
    private String refreshToken;
    private Long id;

    public RefreshToken(String refreshToken, Long id) {
        this.refreshToken = refreshToken;
        this.id = id;
    }
}
