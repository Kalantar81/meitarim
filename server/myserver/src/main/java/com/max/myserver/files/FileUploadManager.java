package com.max.myserver.files;

import static akka.http.javadsl.server.Directives.complete;
import static akka.http.javadsl.server.Directives.entity;
import static akka.http.javadsl.server.Directives.onSuccess;
import static akka.http.javadsl.server.Directives.path;
import static akka.http.javadsl.server.Directives.storeUploadedFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;

import javax.management.RuntimeErrorException;

import com.max.myserver.bl.Logger;

import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.server.Route;
import akka.http.javadsl.server.directives.FileInfo;
import akka.http.javadsl.unmarshalling.Unmarshaller;
import akka.japi.Pair;
import akka.stream.Materializer;
import akka.stream.javadsl.FileIO;
import scala.util.control.Exception;

public class FileUploadManager {
	
	private static String uploadPath = null;
	public static String getUploadPath() {
		return FileUploadManager.uploadPath;
	}

	/*
	 * Return Route that stores all files into uploadPath path
	 */
	public static Route storeUploadedFileTo(String uploadPath,Materializer materializer) {
		FileUploadManager.uploadPath = uploadPath;
		
		final Function<FileInfo, File> temporaryDestination = (info) -> {
          try {
        	  
        	  return  File.createTempFile(info.getFileName(), "", new File(FileUploadManager.getUploadPath()));
			   
            		//File.createTempFile(info.getFileName(), ".tmp");
          } catch (Throwable e) {
        	  Logger.writeError("storeUploadedFileTo", e);
        	  throw new RuntimeException(e);
          }
        };

        final Route routeUploadedFile = storeUploadedFile("file0", temporaryDestination, (info, file) -> {
          // do something with the file and file metadata ...
          //file.delete();
          String path = FileUploadManager.getUploadPath();	
        	
          String fileName =path + info.getFileName();
      	  
          File f = new File(fileName);
      	  if (f.exists()) {
      		file.delete();
      		return complete("The file already exists (" + info.getFileName() + ")");
      	  }	else {
      		file.renameTo(new File(fileName));
      		 return complete(StatusCodes.OK);
      	  }
        });
        return routeUploadedFile;
	}
	
	/*
	 * Return Route that stores all files into uploadPath path
	 * core use of form
	 */
	public static Route uploadLowLevel(String uploadPath,Materializer materializer) {
		   
		FileUploadManager.uploadPath = uploadPath;
		
		Route routeUpload =  path( "upload", () ->
			  entity(Unmarshaller.entityToMultipartFormData(), formData -> {
			    // collect all parts of the multipart as it arrives into a map
			    final CompletionStage<Map<String, Object>> allParts =
			      formData.getParts().mapAsync(1, bodyPart -> {
			        if ("file".equals(bodyPart.getName())) {
			          // stream into a file as the chunks of it arrives and return a CompletionStage
			          // file to where it got stored
			          //System.out.println("params" + bodyPart.getAdditionalDispositionParams().toString());
			          //final File file = File.createTempFile("upload", "tmp");
			          
			          final File file = File.createTempFile(bodyPart.getAdditionalDispositionParams().get("filename"), "", new File(FileUploadManager.getUploadPath()));
			         
			          return bodyPart.getEntity().getDataBytes()
			            .runWith(FileIO.toPath(file.toPath()), materializer)
			            .thenApply(ignore ->{
			            	Pair<String, Object> pair =new Pair<String, Object>(bodyPart.getName(), file);
			            	return pair;
			            }
			              
			            );
			        } else {
			          // collect form field values
			          return bodyPart.toStrict(2 * 1000, materializer)
			            .thenApply(strict ->{
			            	Pair<String, Object> pair =  new Pair<String, Object>(bodyPart.getName(),
						                strict.getEntity().getData().utf8String());
			            	 pair.second();
			            	return pair;
			            }
			             
			            );
			        }
			      }).runFold(new HashMap<String, Object>(), (acc, pair) -> {
			        acc.put(pair.first(), pair.second());
			        return acc;
			      }, materializer);

			    // simulate a DB call
			    final CompletionStage<Void> done = allParts
			    		.thenCompose(map ->{
				      // You would have some better validation/unmarshalling here
						    CompletableFuture<Void> cf =
						              CompletableFuture.runAsync(() -> {
						                  //System.out.println("running, in thread: " + Thread.currentThread().getName());
						              });
						      cf.join();//waits until task is completed
						      System.out.println("main exiting, thread: "+Thread.currentThread().getName());
			    			return cf;
			    		});

			    // when processing have finished create a response for the user
			    return onSuccess(allParts, x -> complete(StatusCodes.OK));
			  })
			);
		return routeUpload;
	}
}
