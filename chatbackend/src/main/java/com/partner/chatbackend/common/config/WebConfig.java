package com.partner.chatbackend.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.navercorp.lucy.security.xss.servletfilter.XssEscapeServletFilter;
import com.partner.chatbackend.common.argresolver.LoginUserMethodArgumentResolver;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
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
//    private final ObjectMapper objectMapper;

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
                .allowedOrigins("exp://192.168.219.105:19000")
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

//    @Bean
//    public FilterRegistrationBean<XssEscapeServletFilter> filterRegistrationBean() {
//        FilterRegistrationBean<XssEscapeServletFilter> filterRegistration = new FilterRegistrationBean<>();
//        filterRegistration.setFilter(new XssEscapeServletFilter());
//        filterRegistration.setOrder(1);
//        filterRegistration.addUrlPatterns("/*");
//        return filterRegistration;
//    }
}
