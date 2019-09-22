package com.max.myserver.bl;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

import com.max.myserver.data.Constants;
import com.max.myserver.data.FileData;
import com.max.myserver.data.RequestData;

import akka.dispatch.MessageDispatcher;


public class MediaCreator implements IFileReadyCallBack {
	private RequestData userRequest = null;
	int fileCount = 0;
	
	MessageDispatcher executionContext = null;
	IFileReadyCallBack callbackClass = null;
	
	public MediaCreator(RequestData userRequest,IFileReadyCallBack callbackClass,MessageDispatcher executionContext) {
		this.userRequest = userRequest;
		this.callbackClass = callbackClass;
		this.executionContext = executionContext;
	}
	
	public CompletionStage<Boolean> runAsync(){
		CompletableFuture<Boolean> cf = new CompletableFuture<Boolean>();
		//FilesCreatorMockup filesCreator = new FilesCreatorMockup(this);
		//filesCreator.start();
		
		CompletableFuture.supplyAsync(  ()->{
			FilesCreatorMockup filesCreator2 = new FilesCreatorMockup(this);
			filesCreator2.run();
			userRequest.getPicDimensions();
			
			cf.complete(new Boolean(true));
			return new Boolean(true);
		},executionContext);
		
		//cf.complete(true);
		return cf;
	}

	
	
	@Override
	public synchronized void setFileStatus(String fileName,boolean succeded, FileData fileData, String error) {
		
		callbackClass.setFileStatus("file" + fileCount, succeded, fileData, error);
		//callbackClass.setFileStatus(fileName, succeded, fileData, error);

		if (fileCount==Constants.FILES_COUNT_TOTAL) {
			System.out.println("Files Creation Done");
		}
		fileCount ++;
	}
	
}
