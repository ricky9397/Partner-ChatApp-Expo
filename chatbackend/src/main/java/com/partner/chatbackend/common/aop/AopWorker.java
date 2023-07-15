package com.partner.chatbackend.common.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Configuration
@Aspect
public class AopWorker {

    //    @Around("execution(public * 패키지.대상컨트롤러.*(..))")
    public Object browserCheck(ProceedingJoinPoint point) throws RuntimeException {
        final ServletRequestAttributes attribute = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes());
        final HttpServletRequest request = Optional.ofNullable(attribute).map(ServletRequestAttributes::getRequest).orElse(null);
        String userAgent = request.getHeader("User-Agent").toUpperCase();
        try {
            Object proceed = point.proceed();
            if (userAgent.contains("ANDROID") || userAgent.contains("TABLET") || userAgent.contains("IPAD") || userAgent.contains("MOBILE") || userAgent.contains("IPHONE")) {
                proceed = "mobile/" + proceed;   ///모바일이면 요기에 붙여 줌
            }
            return proceed;
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return null;
    }
}
