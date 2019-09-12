package com.max.myserver;

import java.util.Map;
import java.util.HashMap;
import java.io.BufferedReader;
import java.io.File;
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
import akka.stream.javadsl.FileIO;
import akka.stream.javadsl.Flow;
import akka.stream.javadsl.Sink;
import akka.actor.ActorSystem;
import akka.dispatch.MessageDispatcher;
import akka.http.javadsl.Http;
import akka.http.javadsl.ServerBinding;
import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;
import akka.http.javadsl.model.Multiparts;
import akka.http.javadsl.model.headers.RawHeader;
import akka.http.javadsl.model.ws.Message;
import akka.http.javadsl.model.ws.WebSocket;
import akka.http.javadsl.server.Route;
import akka.http.javadsl.unmarshalling.Unmarshaller;
import akka.japi.Pair;
import com.max.myserver.bl.FilesCreatorMockup;
import com.max.myserver.bl.Logger;
import com.max.myserver.bl.SessionManager;
import com.max.myserver.files.FileManager;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import java.io.IOException;
import static akka.http.javadsl.server.Directives.complete;
import static akka.http.javadsl.server.Directives.entity;
import static akka.http.javadsl.server.Directives.onSuccess;
import static akka.http.javadsl.server.Directives.path;



public class MediaServer {

 public static void main(String[] args) throws Exception {
	 
	    Config conf = ConfigFactory.load("application.conf");
	    //System.out.println("myParam"+ conf.getString("akka.myParam"));
	    ActorSystem system = ActorSystem.create("akka", conf);
	    
	    final MessageDispatcher executionContext = system.dispatchers().lookup("akka.my-dispatcher");
	    
	    try {
	      final Materializer materializer = ActorMaterializer.create(system);
	      final Function<HttpRequest, CompletionStage<HttpResponse>> handler = request -> handleRequest(request,materializer,executionContext, system);
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
  public static CompletionStage<HttpResponse>  handleRequest(HttpRequest request,Materializer materializer,MessageDispatcher executionContext,ActorSystem system) {
	  
		return CompletableFuture.supplyAsync(  ()->{
			 try {
//
//				Route route= path("video", () ->
//				  entity(Unmarshaller.entityToMultipartFormData(), formData -> {
//				    // collect all parts of the multipart as it arrives into a map
//				    final CompletionStage<Map<String, Object>> allParts =
//				      formData.getParts().mapAsync(1, bodyPart -> {
//				        if ("file".equals(bodyPart.getName())) {
//				          // stream into a file as the chunks of it arrives and return a CompletionStage
//				          // file to where it got stored
//				          final File file = File.createTempFile("upload", "tmp");
//				          return bodyPart.getEntity().getDataBytes()
//				            .runWith(FileIO.toPath(file.toPath()), materializer)
//				            .thenApply(ignore ->
//				              new Pair<String, Object>(bodyPart.getName(), file)
//				            );
//				        } else {
//				          // collect form field values
//				          return bodyPart.toStrict(2 * 1000, materializer)
//				            .thenApply(strict ->
//				              new Pair<String, Object>(bodyPart.getName(),
//				                strict.getEntity().getData().utf8String())
//				            );
//				        }
//				      }).runFold(new HashMap<String, Object>(), (acc, pair) -> {
//				        acc.put(pair.first(), pair.second());
//				        return acc;
//				      }, materializer);
//
//				    // simulate a DB call
////				    final CompletionStage<Void> done = allParts.thenCompose(map ->
////				      // You would have some better validation/unmarshalling here
////				      DB.create((File) map.get("file"),
////				        (String) map.get("title"),
////				        (String) map.get("author")
////				      ));
//
//				    // when processing have finished create a response for the user
//				    return onSuccess(allParts, x -> complete("ok!"));
//				  })
//				);
				
				 
				 
				  System.out.println("Handling request to " + request.getUri());
				    if (request.getUri().path().equals("/mediaChat")) {
				    	SessionManager sessionManager = new SessionManager(materializer,executionContext);
					    final Flow<Message, Message, NotUsed> greeterFlow = sessionManager.createGreeter();
					    return WebSocket.handleWebSocketRequestWith(request, greeterFlow);
				    } else if (request.getUri().path().equals("/getfile")){
				    	return  FileManager.getFile(request);
				    }else {
				    	return HttpResponse.create().withStatus(404);
				    }
			  }catch (Exception e) {
				  Logger.writeError("main error",e);
				  return HttpResponse.create().withEntity(e.getMessage()).withStatus(500);
			  }
		},executionContext);
	
  }
 

 
  //#websocket-handler
}
  
