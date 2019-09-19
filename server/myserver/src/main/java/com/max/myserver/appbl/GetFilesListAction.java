package com.max.myserver.appbl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import com.max.myserver.data.FilesListResult;
import com.max.myserver.data.RequestInput;
import com.max.myserver.data.Result;
import com.max.myserver.utils.Configuration;
import com.max.myserver.utils.Logger;

public class GetFilesListAction {
	
	public Result getData(RequestInput input) {
		FilesListResult filesListResult = new FilesListResult();
		
		try {
			Files.walk(Paths.get(Configuration.getUploadPath()))
			 .filter(Files::isRegularFile)
			 .forEach(file->{
				 filesListResult.addFile(file.getFileName().toString());
			 });
		} catch (IOException e) {
			Logger.writeError("Error in GetFilesList", e);
		}
		
		return filesListResult;
	}
}
