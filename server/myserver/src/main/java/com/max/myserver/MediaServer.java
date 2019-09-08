package com.max.myserver;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.TimeUnit;
import akka.NotUsed;
import akka.http.javadsl.ConnectHttp;
import akka.japi.Function;
import akka.stream.ActorMaterializer;
import akka.stream.Materializer;
import akka.stream.javadsl.Flow;
import akka.actor.ActorSystem;
import akka.dispatch.MessageDispatcher;
import akka.http.javadsl.Http;
import akka.http.javadsl.ServerBinding;
import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.headers.RawHeader;
import akka.http.javadsl.model.ws.Message;
import akka.http.javadsl.model.ws.WebSocket;
import akka.http.javadsl.server.Route;

import com.max.myserver.bl.FilesCreatorMockup;
import com.max.myserver.bl.Logger;
import com.max.myserver.bl.SessionManager;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import java.io.IOException;

public class MediaServer {

 public static void main(String[] args) throws Exception {
	 
	    Config conf = ConfigFactory.load("application.conf");
	    //System.out.println("myParam"+ conf.getString("akka.myParam"));
	    ActorSystem system = ActorSystem.create("akka", conf);
	    
	    final MessageDispatcher executionContext = system.dispatchers().lookup("akka.my-dispatcher");
	    
	    try {
	      final Materializer materializer = ActorMaterializer.create(system);
	      final Function<HttpRequest, CompletionStage<HttpResponse>> handler = request -> handleRequest(request,materializer,executionContext);
	      //CompletionStage<ServerBinding> serverBindingFuture =
	      //  Http.get(system).bindAndHandleSync(
	      //    handler, ConnectHttp.toHost("localhost", 8080), materializer);
	      // will throw if binding fails
	      CompletionStage<ServerBinding> serverBindingFuture =
	  	        Http.get(system).bindAndHandleAsync(
	  	          handler, ConnectHttp.toHost("localhost", 8080), materializer);
	      serverBindingFuture.toCompletableFuture().get(1, TimeUnit.SECONDS);
	      System.out.println("Press ENTER to stop.");
	      new BufferedReader(new InputStreamReader(System.in)).readLine();
	    } catch(Exception ex) {
	    	Logger.writeError("main error",ex);
	    }
	    finally {
	      system.terminate();
	    }
  }
	
  //#websocket-handling
  public static CompletionStage<HttpResponse>  handleRequest(HttpRequest request,Materializer materializer,MessageDispatcher executionContext) {
	  
		return CompletableFuture.supplyAsync(  ()->{
			 try {
				  System.out.println("Handling request to " + request.getUri());
				    if (request.getUri().path().equals("/mediaChat")) {
				    	SessionManager sessionManager = new SessionManager(materializer,executionContext);
					    final Flow<Message, Message, NotUsed> greeterFlow = sessionManager.createGreeter();
					    return WebSocket.handleWebSocketRequestWith(request, greeterFlow);
				    } else if (request.getUri().path().equals("/getfile")){
				    	return  getFile(request);
				    }else {
				    	return HttpResponse.create().withStatus(404);
				    }
			  }catch (Exception e) {
				  Logger.writeError("main error",e);
				  return HttpResponse.create().withEntity(e.getMessage()).withStatus(500);
			  }
		},executionContext);
		
  }
 

 
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

		 HttpResponse response = HttpResponse.create()
				 .addHeader(contType)
				 .addHeader(contLen)
				 .addHeader(contDisp)
				 .addHeader(contTrans)
				 .withEntity(array);
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
            extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
     } catch (Exception e) {
         extension = "";
     }

     return extension;

 }
  
  //#websocket-handler
}
  
