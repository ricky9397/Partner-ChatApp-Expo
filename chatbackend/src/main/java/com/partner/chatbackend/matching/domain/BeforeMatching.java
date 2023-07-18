package com.partner.chatbackend.matching.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Entity
@Table(name = "TB_BF_MATCHING")
public class BeforeMatching {

    @Id
    @Column(name = "MATCHING_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MAN_ID")
    private Long manId;

    @Column(name = "WOMEN_ID")
    private Long womenId;

    @Column(name = "LIKE_YN", length = 1)
    @ColumnDefault(value = "'N'")
    private String likeYn;

    @Column(name = "TO_LIKE_CNT")
    private Long toLikeCnt;
}
