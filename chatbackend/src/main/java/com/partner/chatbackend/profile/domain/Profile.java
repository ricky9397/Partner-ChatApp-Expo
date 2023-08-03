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

    @Column(name = "IMAGE_ID")
    private int imageId;

    @Column(name = "IMAGE_NAME")
    private String imageName;

    @Column(name = "IMAGE_PATH")
    private String imagePath;





}
