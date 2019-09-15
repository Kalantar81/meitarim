package com.max.myserver.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import akka.http.javadsl.model.ContentTypes;
import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.MediaType;
import akka.http.javadsl.model.MediaTypes;
import akka.http.javadsl.model.ContentType;
import akka.http.javadsl.model.headers.RawHeader;

public class FileManager {

	 public static HttpResponse getFile(HttpRequest httpRequest) {//ActorSystem system,ActorMaterializer materializer,
		
	  //TODO add file path dynamically	
		String filePath = "files/";
		try {
			 String fileName = httpRequest.getUri().query().getOrElse("fileName", "NO_FILE");
			 byte[] array;
			 array = Files.readAllBytes(Paths.get(filePath + fileName));
			 //HttpHeader contType = RawHeader.create("Content-Type", getMimeType(fileName));
			 //HttpHeader contLen = RawHeader.create("Content-Length", "" + array.length);
			 HttpHeader contDisp = RawHeader.create("Content-Disposition","attachment; filename=\"" + fileName + "\"" );
			 HttpHeader contTrans = RawHeader.create("Content-Transfer-Encoding","binary" );
			 HttpHeader contAccept = RawHeader.create("Accept-Ranges","bytes" );
    
		     HttpResponse response = HttpResponse.create()
					 .addHeader(contAccept)
					 .addHeader(contDisp)
					 .addHeader(contTrans).withEntity(getMimeContentType(fileName),array);
					 
			 
			 return response;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return HttpResponse.create().withStatus(500).withEntity(" Load file error:" + e.getMessage());
		}
		
		

		 
	 }
	 
	 public static ContentType getMimeContentType(String fileName) {
		 ContentType mimeType = null;
		 String fileExt = getFileExtension (fileName);
		 switch (fileExt) {
		 	case "jpeg":
		 		mimeType = MediaTypes.IMAGE_JPEG.toContentType();
		 		break;
		 	case "jpg":
		 		mimeType =MediaTypes.IMAGE_JPEG.toContentType();
		 		break;		
		 	case "png":
		 		mimeType = MediaTypes.IMAGE_PNG.toContentType();
		 		break;		
		 	case "mp4":
		 		mimeType =  MediaTypes.VIDEO_MP4.toContentType();
		 		break;
		 	default:
		 		mimeType =  MediaTypes.APPLICATION_OCTET_STREAM.toContentType();
		 		break;
		 }
		 return mimeType;
		    
	 }
	 
	 public static String getMimeType (String fileName) {
		 String mimeType = "";
		 String fileExt = getFileExtension (fileName);
		 switch (fileExt) {
		 	case "jpeg":
		 		mimeType = "image/jpeg";
		 		break;
		 	case "jpg":
		 		mimeType = "image/jpeg";
		 		break;		
		 	case "png":
		 		mimeType = "image/png";
		 		break;		
		 	case "mp4":
		 		mimeType = "video/mp4";
		 		break;
		 	default:
		 		mimeType = "application/octer-stream";
		 		break;
		 }
		 return mimeType;
	 }
	 
	 private static String getFileExtension(String fileName) {
	     String extension = "";
	     try {
	            extension = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	     } catch (Exception e) {
	         extension = "";
	     }

	     return extension;

	 }
	  
}
