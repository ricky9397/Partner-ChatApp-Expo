package com.partner.chatbackend.common.cm;

import com.partner.chatbackend.common.utils.DateFormatUtils;
import com.partner.chatbackend.common.utils.Utils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;

public class FileUploadUtils {

    private static final String[] FILE_EXTENTION =
    {
            "JPG","JPEG","PNG","BMP","TIF","TIFF"
            ,"TXT","HWP","DOCX","DOC","M4A"
            ,"PPT","PPTX","XLS","XLSX","MP3","WAV"
            ,"PDF","MP4","AVI","WMV","ZIP","RAR","TAR"
            ,"7Z","TBZ","TGZ","LZH","GZ","AI"
    };


    public static final String FILE_SIZE    = "fileSize";
    public static final String FILE_PATH    = "flpth";
    public static final String FILE_NAME    = "orginlFileNm";
    public static final String FILE_RE_NAME = "sysFileNm";
    public static final String FILE_EXT     = "fileExtsn";
    public static final String FILE_OBJ     = "fileObject";


    public static HashMap<String, Object> upload(MultipartFile file, String basePath, String subPath, String additionalPath) throws IllegalStateException, IOException {
        /* 결과 */
        HashMap<String , Object> result = new HashMap<String, Object>();

        String now      = DateFormatUtils.getMillisecondsTime();
        Random random   = new Random(System.currentTimeMillis());

        /* 게시판용 업로드 경로 */
        StringBuilder uploadPath = new StringBuilder(basePath);
        uploadPath.append(subPath);

        /* 추가 경로정보가 있으면 적용한다. */
        if(Utils.isEmpty(additionalPath) == false){
            uploadPath.append(additionalPath);
        }

        /* 디렉토리 유효성 검사 */
        File dir = new File(uploadPath.toString());
        if (!dir.exists()){
            dir.mkdirs();
        }

        /* 파일정보 */
        String originalName = file.getOriginalFilename();   /* 원본 파일명 */
        String reName       = null;                         /* 저장된 파일명 */
        String ext          = null;                         /* 확장자 */
        String fullPath     = null;                         /* 파일 풀 경로 */

        int start   = originalName.lastIndexOf(".") + 1;
        int end     = originalName.length();
        ext         = originalName.substring(start, end);
        reName      = now + "_" + random.nextInt(10) + "." + ext;

        /* 파일 저장 */
        File saveFile   = null;
        fullPath        = uploadPath.toString() + File.separator + reName;
        saveFile        = new File(fullPath);
        file.transferTo(saveFile);

        /* 정보 */
        result.put(FILE_SIZE    , file.getSize());
        result.put(FILE_PATH    , subPath);
        result.put(FILE_NAME    , originalName);
        result.put(FILE_RE_NAME , reName);
        result.put(FILE_EXT     , ext);
        result.put(FILE_OBJ     , saveFile);

        /* 반환 */
        return result;
    }


    /**
     * 허용되는 파일인지 확인한다.
     */
    private static boolean isAcceptFileCheck(String fileName)
    {
        String[] fileNameDotSplit = StringUtils.split(fileName, ".");
        boolean rst = false;
        if (fileNameDotSplit == null || fileNameDotSplit.length == 0)
            return false;
        else
        {
            String fileExtention = fileNameDotSplit[fileNameDotSplit.length - 1];
            if(fileExtention != null) {
                rst = ArrayUtils.contains(FILE_EXTENTION, fileExtention.toUpperCase());
            }
        }
        return rst;
    }
}
