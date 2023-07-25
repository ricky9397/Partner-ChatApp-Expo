package com.partner.chatbackend.common.argresolver;

import com.partner.chatbackend.common.annotation.LoginUserId;
import com.partner.chatbackend.common.exception.AuthenticationUserException;
import com.partner.chatbackend.common.utils.Utils;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Component
public class LoginUserMethodArgumentResolver implements HandlerMethodArgumentResolver {


    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginUserId.class);
    }

    @Override
    public Object resolveArgument(@NotNull MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String googleId = Objects.requireNonNull(webRequest.getUserPrincipal(), "인증된 사용자가 존재하지 않습니다.").getName();

        if(Utils.isNull(googleId)) {
            return new AuthenticationUserException("인증된 사용자가 존재하지 않습니다.");
        }
        return null;
    }
}
