package com.partner.chatbackend.common.cm;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {

    @CreatedDate
    @Column(name = "REG_DATE")
    public LocalDateTime regDate;

    @LastModifiedDate
    @Column(name = "MOD_DATE")
    public LocalDateTime modDate;

    @LastModifiedDate
    @Column(name = "LOGIN_DATE")
    public LocalDateTime loginDate;

}
