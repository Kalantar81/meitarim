package com.max.myserver.appbl;

import com.max.myserver.data.Result;

import akka.http.javadsl.model.HttpRequest;
import akka.http.javadsl.model.HttpResponse;

public class DataSupplier {
	 public  HttpResponse getData(HttpRequest httpRequest) {//ActorSystem system,ActorMaterializer materializer,
		 
		 Result result  = getOperationResult(httpRequest);
	     HttpResponse response = HttpResponse.create().withEntity(result.toJson());

	     return response;
	 }

	private  Result getOperationResult(HttpRequest httpRequest) {

		Result result = null;
		String operation = httpRequest.getUri().query().getOrElse("op", "NO_FILE");
		
		switch (operation) {
			case "getFilesList":
					GetFilesListAction getFilesListAction = new GetFilesListAction();
					result = getFilesListAction.getData(null);
				break;
			default :
				throw new RuntimeException("Operation " + operation + " wsn't found" );
		
		}
			
		return result;
	}
}
