package com.max.myserver.utils;

import java.util.Arrays;
import java.util.List;

import akka.http.javadsl.model.HttpHeader;
import akka.http.javadsl.model.headers.RawHeader;

public class ServerUtils {
	/*
	 * Get Cross-Origin Resource Sharing (CORS) 
	 */
	public static List<HttpHeader> getCorsHeaders() {
		return Arrays.asList(
				  RawHeader.create("Access-Control-Allow-Origin", "*"),
				  RawHeader.create("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With"),
				  RawHeader.create("Access-Control-Allow-Credentials", "false"),
				  RawHeader.create("Access-Control-Max-Age", "3600"),
			      RawHeader.create("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, DELETE"));
	}
}
