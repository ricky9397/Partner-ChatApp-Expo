package com.partner.chatbackend.profile.domain;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TB_PROFILE")
public class Profile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROFILE_ID")
    private Long profileId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "FILE_NO")
    private int fileNo;

    @Column(name = "FILE_NAME")
    private String fileName;

    @Column(name = "FILE_SIZE")
    private String fileSize;

    @Column(name = "FILE_PATH")
    private String filePath;

    @Column(name = "FILE_EXT")
    private String fileExt;

//    @Column(name = "FILE_PATH2")
//    private String filePath2;
//
//    @Column(name = "FILE_PATH3")
//    private String filePath3;
//
//    @Column(name = "FILE_PATH4")
//    private String filePath4;
//
//    @Column(name = "FILE_PATH5")
//    private String filePath5;
//
//    @Column(name = "FILE_PATH6")
//    private String filePath6;




}
