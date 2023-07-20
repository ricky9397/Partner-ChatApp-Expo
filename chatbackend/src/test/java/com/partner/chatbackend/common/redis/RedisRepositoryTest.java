package com.partner.chatbackend.common.redis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RedisRepositoryTest {


    @Autowired
    private PersonRedisRepository personRedisRepository;

    @Test
    void test() {
        Person person = new Person("Park", 20);

        // 저장
        personRedisRepository.save(person);

        // `keyspace:id` 값을 가져옴
        personRedisRepository.findById(person.getId());

        // Person Entity 의 @RedisHash 에 정의되어 있는 keyspace (people) 에 속한 키의 갯수를 구함
        personRedisRepository.count();

        // 삭제
        personRedisRepository.delete(person);
    }

}
