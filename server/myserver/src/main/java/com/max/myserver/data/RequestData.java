package com.max.myserver.data;

public class RequestData {
	private String sourceFileName;
	private PicDimensions picDimensions;
	public String getSourceFileName() {
		return sourceFileName;
	}
	public void setSourceFileName(String sourceFileName) {
		this.sourceFileName = sourceFileName;
	}
	public PicDimensions getPicDimensions() {
		return picDimensions;
	}
	public void setPicDimensions(PicDimensions picDimensions) {
		this.picDimensions = picDimensions;
	}
	
}
