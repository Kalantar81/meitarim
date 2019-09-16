package com.max.myserver.data;

import com.max.myserver.utils.SerializationUtils;

public class RequestInput {
	public String toJson() {
		String result =  SerializationUtils.getJsonOfClass(this);
		return result ;
	}
}
