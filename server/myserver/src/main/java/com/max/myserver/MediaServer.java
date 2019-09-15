package com.max.myserver;

import java.util.Map;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import akka.NotUsed;
import akka.http.javadsl.ConnectHttp;

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
import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.model.headers.HttpOrigin;
import akka.http.javadsl.model.headers.Origin;
import akka.http.javadsl.model.headers.RawHeader;
import akka.http.javadsl.model.ws.Message;
import akka.http.javadsl.model.ws.WebSocket;
import akka.http.javadsl.server.Route;
import akka.http.javadsl.server.directives.FileInfo;
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
import static akka.http.javadsl.server.Directives.handleWebSocketMessages;
import static akka.http.javadsl.server.Directives.mapResponse;
import static akka.http.javadsl.server.Directives.mapRequest;
import static akka.http.javadsl.server.Directives.concat;
import static akka.http.javadsl.server.Directives.extractRequest;

import static akka.http.javadsl.server.Directives.respondWithDefaultHeaders;
import static akka.http.javadsl.server.Directives.storeUploadedFile;

import static akka.http.javadsl.server.PathMatchers.integerSegment;
import static akka.http.javadsl.server.PathMatchers.segment;
import static akka.http.javadsl.server.Directives.options;

public class MediaServer {

 public static void main(String[] args) throws Exception {
	 
	    Config conf = ConfigFactory.load("application.conf");
	    //System.out.println("myParam"+ conf.getString("akka.myParam"));
	    ActorSystem system = ActorSystem.create("akka", conf);
	    
	    final MessageDispatcher executionContext = system.dispatchers().lookup("akka.my-dispatcher");
	    
	    try {
	      final Materializer materializer = ActorMaterializer.create(system);
	      final Function<HttpRequest, CompletionStage<HttpResponse>> handler = request -> handleRequest(request,materializer,executionContext, system);
	  
	      
	      SessionManager sessionManager = new SessionManager(materializer,executionContext);
		  final Flow<Message, Message, NotUsed> greeterFlow = sessionManager.createGreeter();
	      
		  final List<HttpHeader> headers = Arrays.asList(
				  RawHeader.create("Access-Control-Allow-Origin", "*"),
				  RawHeader.create("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With"),
				  RawHeader.create("Access-Control-Allow-Credentials", "true"),
				  RawHeader.create("Access-Control-Max-Age", "3600"),
			      RawHeader.create(" Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, DELETE"));

		   Route routeUpload=  path( "upload", () ->
			  entity(Unmarshaller.entityToMultipartFormData(), formData -> {
			    // collect all parts of the multipart as it arrives into a map
			    final CompletionStage<Map<String, Object>> allParts =
			      formData.getParts().mapAsync(1, bodyPart -> {
			        if ("file".equals(bodyPart.getName())) {
			          // stream into a file as the chunks of it arrives and return a CompletionStage
			          // file to where it got stored
			          System.out.println("params" + bodyPart.getAdditionalDispositionParams().toString());
			          //final File file = File.createTempFile("upload", "tmp");
			          
			          final File file = File.createTempFile(bodyPart.getAdditionalDispositionParams().get("filename"), "", new File("C:\\Projects\\angular_dima\\meitarim\\server\\myserver\\uploadfiles"));
			         
			          
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
						                  System.out.println("running, in thread: " + Thread.currentThread().getName());
						              });
						      cf.join();//waits until task is completed
						      System.out.println("main exiting, thread: "+Thread.currentThread().getName());
			    			return cf;
			    		});

			    // when processing have finished create a response for the user
			    return onSuccess(allParts, x -> complete(StatusCodes.OK));
			  })
			);

	      final Route routeOptions1 = options(() -> complete(StatusCodes.OK));
	      
	      final Route routeOptions2 =  respondWithDefaultHeaders(headers,()->{
	    	  System.out.println("respondWithDefaultHeaders in routeOptions2");
	    	  return routeOptions1;
	      });

	      
	      final Route routeuploadWithHeaders = respondWithDefaultHeaders(headers,()->{
	    	  System.out.println("HERE");
	    	  //return routeStore;
	    	   return routeUpload;
	      });
	      
		  final Route routeGen = concat(
				  routeOptions2,
				  path("getfile", () ->extractRequest(req -> complete(FileManager.getFile(req)))),
				  path("mediaChat", () ->handleWebSocketMessages(greeterFlow)),
				  path("up2", () -> complete(StatusCodes.CREATED, "bar"))
				  ,
				  routeuploadWithHeaders //upload
				);
	
	      
	      
//	      CompletionStage<ServerBinding> serverBindingFuture =
//	  	        Http.get(system).bindAndHandleAsync(
//	  	          handler, ConnectHttp.toHost("localhost", 8080), materializer);
		      
    	 final CompletionStage<ServerBinding> binding = Http.get(system).bindAndHandle(routeGen.flow(system, materializer),
	    		        ConnectHttp.toHost("localhost", 8080), materializer);

	    System.out.println("Server online at http://localhost:8080/\nPress RETURN to stop...");
	    System.in.read(); // let it run until user presses return

	    binding
	        .thenCompose(ServerBinding::unbind) // trigger unbinding from the port
	        .thenAccept(unbound -> system.terminate()); // and shutdown when done 	
	    	
			    
	     //System.out.println("Press ENTER to stop.");
	     //new BufferedReader(new InputStreamReader(System.in)).readLine();
	     
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
  
