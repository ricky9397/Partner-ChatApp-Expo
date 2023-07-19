package com.partner.chatbackend.user.domain;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TB_PROFILE")
public class Profile {

    @Id
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "IMAGE_NAME")
    private String imageName;

    @Column(name = "IMAGE_PATH")
    private String imagePath;

//    @Column(name = "IMAGE_PATH2")
//    private String imagePath2;
//
//    @Column(name = "IMAGE_PATH3")
//    private String imagePath3;
//
//    @Column(name = "IMAGE_PATH4")
//    private String imagePath4;
//
//    @Column(name = "IMAGE_PATH5")
//    private String imagePath5;

}
