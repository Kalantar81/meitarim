package com.max.myserver.utils;

import com.typesafe.config.Config;

public class Configuration {

	
	
	private static Config config = null;
	private static String uploadPath = null;
	
	public static void initConfig(Config config ) {
		Configuration.config = config;
	}
	
	public static String getString(String paramName) {
		return config.getString ("akka.app." + paramName);
	}
	public static int getInt(String paramName) {
		return config.getInt ("akka.app." +paramName); 
	}
	
	public synchronized static String getUploadPath () {
		if (Configuration.uploadPath == null) {
			Configuration.uploadPath = Configuration.getString("uploadPath");
		}
		return Configuration.uploadPath;
	}
}
