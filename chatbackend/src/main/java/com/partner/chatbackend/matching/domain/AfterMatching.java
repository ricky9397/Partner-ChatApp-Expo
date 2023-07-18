package com.partner.chatbackend.matching.domain;

import com.partner.chatbackend.chatting.domain.Message;
import com.partner.chatbackend.common.cm.BaseChatTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@Entity
@Table(name = "TB_AF_MATCHING")
public class AfterMatching extends BaseChatTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MATCHING_ID")
    private Long id;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "MATCHING_ID")
    private List<Message> messages = new ArrayList<>();

    @Column(name = "MAN_ID")
    private Long manId;

    @Column(name = "WOMEN_ID")
    private Long womenId;

    @Column(name = "MATCHING_YN", length = 1)
    @ColumnDefault(value = "'Y'")
    private String likeYn;

    @Builder
    public AfterMatching(Long id, Long manId, Long womenId, String likeYn) {
        this.id = id;
        this.manId = manId;
        this.womenId = womenId;
        this.likeYn = likeYn;
    }
}
