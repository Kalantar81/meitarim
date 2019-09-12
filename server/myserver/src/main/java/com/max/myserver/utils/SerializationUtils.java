package com.max.myserver.utils;

import com.google.gson.Gson;

public class SerializationUtils {
	
	public static <T> T getClassByString(Class<T> classType, String sourceStr) {
		Gson gson = new Gson();
		T myClass = gson.fromJson(sourceStr, classType);
		return myClass;	
	}
	
	public static String getJsonOfClass(Object obj) {
		Gson gson = new Gson();
		String jsonStr = gson.toJson(obj);
		return jsonStr;
	}
	
}
