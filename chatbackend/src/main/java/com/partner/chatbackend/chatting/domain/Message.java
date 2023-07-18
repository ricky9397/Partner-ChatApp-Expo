package com.partner.chatbackend.chatting.domain;

import com.partner.chatbackend.common.cm.BaseChatTimeEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "TB_MESSAGE")
public class Message extends BaseChatTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID")
    private Long id;

    @Column(name = "MATCHING_ID")
    private Long roomId;

    @NotNull
    @Column(name = "SEND_ID")
    private Long sendId;

    @NotNull
    @Column(name = "SEND_NAME")
    private String sendName;

    @NotNull
    @Column(name = "SEND_MESSAGE")
    private String sendMessage;

    @Builder
    public Message (Long id, Long sendId, String sendName, String sendMessage) {
        this.id = id;
        this.sendId = sendId;
        this.sendName = sendName;
        this.sendMessage = sendMessage;
    }

}
