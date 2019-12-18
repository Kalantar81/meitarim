package com.max.myserver.app;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.function.Supplier;

import akka.NotUsed;
import akka.http.javadsl.ConnectHttp;

import akka.stream.ActorMaterializer;
import akka.stream.Materializer;
import akka.stream.javadsl.Flow;
import akka.actor.ActorSystem;
import akka.dispatch.MessageDispatcher;
import akka.http.javadsl.Http;
import akka.http.javadsl.ServerBinding;
import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.StatusCodes;
import akka.http.javadsl.model.ws.Message;
import akka.http.javadsl.server.Directives;
import akka.http.javadsl.server.ExceptionHandler;
import akka.http.javadsl.server.RejectionHandler;
import akka.http.javadsl.server.Route;

import com.max.myserver.appbl.DataSupplier;
import com.max.myserver.bl.SessionManager;
import com.max.myserver.files.FileManager;
import com.max.myserver.files.FileUploadManager;
import com.max.myserver.utils.Configuration;
import com.max.myserver.utils.Logger;
import com.max.myserver.utils.ServerUtils;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import static akka.http.javadsl.server.Directives.complete;
import static akka.http.javadsl.server.Directives.path;
import static akka.http.javadsl.server.Directives.handleWebSocketMessages;
import static akka.http.javadsl.server.Directives.concat;
import static akka.http.javadsl.server.Directives.extractRequest;
import static akka.http.javadsl.server.Directives.respondWithDefaultHeaders;

import static akka.http.javadsl.server.Directives.handleExceptions;
import static akka.http.javadsl.server.Directives.handleRejections;
import static akka.http.javadsl.server.Directives.failWith;

import static ch.megard.akka.http.cors.javadsl.CorsDirectives.cors;
import static ch.megard.akka.http.cors.javadsl.CorsDirectives.corsRejectionHandler;

import static akka.http.javadsl.server.Directives.options;

public class MediaServer {

 public static void main(String[] args) throws Exception {
	 
	    Config conf = ConfigFactory.load("application.conf");
	    //System.out.println("myParam"+ conf.getString("akka.myParam"));
	    ActorSystem system = ActorSystem.create("akka", conf);
	    Configuration.initConfig(conf);
		    
	    try {
	    	final Materializer materializer = ActorMaterializer.create(system);
	      
	    	final CompletionStage<ServerBinding> binding = 
    			 Http.get(system).bindAndHandle(creatRouting(system, materializer).flow(system, materializer),
	    		        ConnectHttp.toHost("localhost", 8080), materializer);

		    System.out.println("Server online at http://localhost:8080/\nPress RETURN to stop...");
		    System.in.read(); // let it run until user presses return
	
		    binding
		        .thenCompose(ServerBinding::unbind) // trigger unbinding from the port
		        .thenAccept(unbound -> system.terminate()); // and shutdown when done 	
		    	
	     
	    } catch(Exception ex) {
	    	Logger.writeError("main error",ex);
	    }
	    finally {
	      system.terminate();
	    }
  }
 
  public static Route creatRouting(ActorSystem system,Materializer materializer) {
	  
	  final MessageDispatcher executionContext = system.dispatchers().lookup("akka.my-dispatcher");
      SessionManager sessionManager = new SessionManager(materializer,executionContext);
      final Flow<Message, Message, NotUsed> webSocketFlow = sessionManager.createGreeter();
      String uploadPath = Configuration.getUploadPath();// "C:\\Projects\\angular_dima\\meitarim\\server\\myserver\\uploadfiles";
      
      //Main Routng
	  final Route routeGen = concat(
			  path("getfile", () -> extractRequest(req -> complete(FileManager.getFile(req)))),
			  path("mediaChat", () -> handleWebSocketMessages(webSocketFlow)),
			  path("upload", () -> FileUploadManager.storeUploadedFileTo(uploadPath, materializer)),
			  path("getData",() -> {
				  DataSupplier dataSupplier = new DataSupplier();
				  return extractRequest(req -> complete( dataSupplier.getData(req))) ;
			  	}
			  )
			);

	  // Your rejection handler
      final RejectionHandler rejectionHandler = corsRejectionHandler().withFallback(RejectionHandler.defaultHandler());

      // Your exception handler
      final ExceptionHandler exceptionHandler = ExceptionHandler.newBuilder()
              .match(NoSuchElementException.class, ex -> complete(StatusCodes.NOT_FOUND, ex.getMessage()))
              .match(Throwable.class, ex -> {
            	  Logger.writeError("ExceptionHandler:", ex);
            	  return complete(StatusCodes.INTERNAL_SERVER_ERROR,"{\"error\":\""+  ex.getMessage() + "\"}");
              })
              .build();

      // Combining the two handlers only for convenience
      final Function<Supplier<Route>, Route> handleErrors = inner -> Directives.allOf(
              s -> handleExceptions(exceptionHandler, s),
              s -> handleRejections(rejectionHandler, s),
              inner
      );

      // Note how rejections and exceptions are handled *before* the CORS directive (in the inner route).
      // This is required to have the correct CORS headers in the response even when an error occurs.
      
      return handleErrors.apply(()->cors(()->handleErrors.apply(()->routeGen)));
    		 
  }
 
	
  	//#websocket-handling
	//  public static CompletionStage<HttpResponse>  handleRequest(HttpRequest request,Materializer materializer,MessageDispatcher executionContext,ActorSystem system) {
	//	  
	//		return CompletableFuture.supplyAsync(  ()->{
	//			 try {
	//
	//				  System.out.println("Handling request to " + request.getUri());
	//				    if (request.getUri().path().equals("/mediaChat")) {
	//				    	SessionManager sessionManager = new SessionManager(materializer,executionContext);
	//					    final Flow<Message, Message, NotUsed> greeterFlow = sessionManager.createGreeter();
	//					    return WebSocket.handleWebSocketRequestWith(request, greeterFlow);
	//				    } else if (request.getUri().path().equals("/getfile")){
	//				    	return  FileManager.getFile(request);
	//				    }else {
	//				    	return HttpResponse.create().withStatus(404);
	//				    }
	//			  }catch (Exception e) {
	//				  Logger.writeError("main error",e);
	//				  return HttpResponse.create().withEntity(e.getMessage()).withStatus(500);
	//			  }
	//		},executionContext);
	//	
	//  }
 

 
  //#websocket-handler
}
  
