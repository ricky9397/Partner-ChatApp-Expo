package com.partner.chatbackend.common.utils;


import com.partner.chatbackend.common.rest.RestData;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Utils {

    /**+
     * IP 공통
     * @param request
     * @return
     */
    public static String getIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }


    /**
     * String 타입 null 체크
     * @param string
     * @return
     */
    public static boolean isNull(String string) {
        return "".equals(string) || string.equalsIgnoreCase("null") || string.length() == 0 || string == null ? true : false;
    }
    
    /**
     * Object null, 공백 체크 공통
     * @param obj
     * @return
     */
    public static boolean isEmpty(Object obj) {
        if (obj == null || obj.equals("") || obj.toString().length() == 0) return true;
        if ((obj instanceof String) && (((String) obj).trim().length() == 0))
            return true;
        if (obj instanceof Map)
            return ((Map<?, ?>) obj).isEmpty();
        if (obj instanceof Map)
            return ((Map<?, ?>) obj).isEmpty();
        if (obj instanceof List)
            return ((List<?>) obj).isEmpty();
        if (obj instanceof Object[])
            return (((Object[]) obj).length == 0);

        return false;
    }


    /**
     * ResponseEntity return 커스텀
     * @param args
     * @return
     * @param <K>
     * @param <V>
     */
    public static <K, V> Map<K, V> mapOf(Object... args) {
        Map<K, V> map = new LinkedHashMap<>();

        int size = args.length / 2;

        for (int i = 0; i < size; i++) {
            int keyIndex = i * 2;
            int valueIndex = keyIndex + 1;

            K key = (K) args[keyIndex];
            V value = (V) args[valueIndex];

            map.put(key, value);
        }

        return map;
    }

    /**
     * ResponseEntity return 커스텀 class
     */
    public static class spring {
        public static <T> ResponseEntity<RestData> responseEntityOf(RestData<T> rsData) {
            return responseEntityOf(rsData, null);
        }

        /**
         * ResponseEntity return 커스텀 Header null 안던지고 null이 아닐경우 같이 return
         * @param rsData
         * @param headers
         * @return
         * @param <T>
         */
        public static <T> ResponseEntity<RestData> responseEntityOf(RestData<T> rsData, HttpHeaders headers) {
            return new ResponseEntity<>(rsData, headers, rsData.isSuccess() ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
        }
        public static HttpHeaders httpHeadersOf(String... args) {
            HttpHeaders headers = new HttpHeaders();
            Map<String, String> map = Utils.mapOf(args);
            for (String key : map.keySet()) {
                String value = map.get(key);
                headers.set(key, value);
            }
            return headers;
        }
    }


}
