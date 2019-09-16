package com.max.myserver.data;

import com.max.myserver.utils.SerializationUtils;

public class Result {
	
	public String toJson() {
		String result =  SerializationUtils.getJsonOfClass(this);
		return result ;
	}
}
