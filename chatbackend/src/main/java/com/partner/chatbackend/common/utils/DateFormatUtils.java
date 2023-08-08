package com.partner.chatbackend.common.utils;

import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

public class DateFormatUtils extends org.apache.commons.lang3.time.DateFormatUtils{
    public static String getMillisecondsTime() {
        return format(Calendar.getInstance(), "yyyyMMddHHmmssSSS", TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREAN);
    }
    public static String getDateFormat(String dateFormat) {
        return format(Calendar.getInstance(), dateFormat, TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREAN);
    }
}
