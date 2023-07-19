package com.partner.chatbackend.chatting.domain;

import java.time.LocalDateTime;


public interface ChatList {

    Long getMatching_Id();
    Long getUser_Id();
    String getImage_Path();
    String getUser_Name();
    String getSend_Message();
    LocalDateTime getReg_Date();


}
