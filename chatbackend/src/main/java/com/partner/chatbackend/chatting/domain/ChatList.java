package com.partner.chatbackend.chatting.domain;

import java.time.LocalDateTime;


public interface ChatList {

    Long getMatchingId();
    Long getId();
    String getImagePath();
    String getUserName();
    String getSendMessage();
    LocalDateTime getRegDate();


}
