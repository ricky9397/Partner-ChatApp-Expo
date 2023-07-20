package com.partner.chatbackend.common.rest;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RestData<T> {

    private int resultCode;
    private String msg;
    private T data;

    private final static int DEFAULT_SUCCESS_RESULT_CODE = 200;
    private final static int DEFAULT_FAIL_RESULT_CODE = 500;

    public static <T> RestData<T> of(int resultCode, String msg, T data) {
        return new RestData<>(resultCode, msg, data);
    }

    public static <T> RestData<T> of(int resultCode, String msg) {
        return of(resultCode, msg, null);
    }

    public static <T> RestData<T> successOf(T data) {
        return of(DEFAULT_SUCCESS_RESULT_CODE, "성공", data);
    }

    public static <T> RestData<T> failOf(T data) {
        return of(DEFAULT_FAIL_RESULT_CODE, "실패", data);
    }

    public boolean isSuccess() {
        return resultCode == DEFAULT_SUCCESS_RESULT_CODE;
    }

    public boolean isFail() {
        return isSuccess() == false;
    }


}
