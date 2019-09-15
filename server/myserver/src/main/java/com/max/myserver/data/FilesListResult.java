package com.max.myserver.data;

import java.util.ArrayList;

public class FilesListResult extends Result  {
	ArrayList<String> files = null;
	public 	FilesListResult() {
		this.files = new ArrayList<String>();
	}
	
	public void addFile (String fileName) {
		files.add(fileName);
	}
}
