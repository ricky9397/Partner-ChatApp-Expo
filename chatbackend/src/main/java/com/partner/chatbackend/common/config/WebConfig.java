package com.partner.chatbackend.common.config;

import com.partner.chatbackend.common.argresolver.LoginUserMethodArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserMethodArgumentResolver loginMemberMethodArgumentResolver;

    public WebConfig(LoginUserMethodArgumentResolver loginMemberMethodArgumentResolver) {
        this.loginMemberMethodArgumentResolver = loginMemberMethodArgumentResolver;
    }


    @Override
    public void addCorsMappings(CorsRegistry CorsRegistry) {
        CorsRegistry
                .addMapping("/**") // 프로그램에서 제공하는 URL
                .allowedOrigins("http://localhost:1337")
                .allowedOrigins("http://localhost:5000")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("http://localhost:8080")
                .allowedOrigins("http://192.168.219.106:19000")
                .allowedOrigins("exp://192.168.219.106:1900")
                .allowedHeaders("*") // 어떤 헤더들을 허용할 것인지
                .allowedMethods( // 어떤 메서드를 허용할 것인지 (GET, POST...)
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.HEAD.name()
                );
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginMemberMethodArgumentResolver);
    }
}
