package com.reboot.intobook.userbook.dto;


import com.reboot.intobook.userbook.entity.UserBookStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Getter
@ToString
@NoArgsConstructor
public class UserBookResponseDto {
    private Long userBookPk;
    private String title;
    private String coverImage;
    private String description;
    private String author;
    private String publisher;
    private int nowPage;
    private Date createdAt;
    private Date startedAt;
    private Date completedAt;
    private UserBookStatus status;
    private int page;
    @Builder
    public UserBookResponseDto(Long userBookPk, String title, String coverImage, String description, String author, String publisher, int nowPage, Date createdAt, Date startedAt, Date completedAt, UserBookStatus status, int page) {
        this.userBookPk = userBookPk;
        this.title = title;
        this.coverImage = coverImage;
        this.description = description;
        this.author = author;
        this.publisher = publisher;
        this.nowPage = nowPage;
        this.createdAt = createdAt;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.status = status;
        this.page = page;
    }
}