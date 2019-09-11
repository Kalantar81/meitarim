package com.max.myserver.files;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.headers.RawHeader;

public class FileManager {

	 public static HttpResponse getFile(HttpRequest httpRequest) {//ActorSystem system,ActorMaterializer materializer,
		
	  //TODO add file path dynamically	
		String filePath = "files/";
		try {
			 String fileName = httpRequest.getUri().query().getOrElse("fileName", "NO_FILE");
			 byte[] array;
			 array = Files.readAllBytes(Paths.get(filePath + fileName));
			 HttpHeader contType = RawHeader.create("Content-Type", getMimeType(fileName));
			 HttpHeader contLen = RawHeader.create("Content-Length", "" + array.length);
			 HttpHeader contDisp = RawHeader.create("Content-Disposition","attachment; filename=\"" + fileName + "\"" );
			 HttpHeader contTrans = RawHeader.create("Content-Transfer-Encoding","binary" );
			 HttpHeader contAccept = RawHeader.create("Accept-Ranges","bytes" );

			 
			 
			 HttpResponse response = HttpResponse.create()
					 .addHeader(contAccept)
					 .addHeader(contType)
					 .addHeader(contLen)
					 .addHeader(contDisp)
					 .addHeader(contTrans).withEntity(array);
					 
			 
			 return response;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return HttpResponse.create().withStatus(500).withEntity(" Load file error:" + e.getMessage());
		}
		
		

		 
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
