package com.cn.easycar.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class MyJSON{
	//status: 0为失败    1为成功
	
	public static String toJSON(Object obj, int status){
		String json = "{" + "\"data\":" + JSON.toJSONString(obj,SerializerFeature.BrowserCompatible,SerializerFeature.DisableCircularReferenceDetect) + ","
						  + "\"message\":" + JSON.toJSONString(getMessage(status), SerializerFeature.BrowserCompatible) + ","
						  + "\"status\":" + JSON.toJSONString(status)
						  + "}";
		return json;
	}
	
	public static String getMessage(int status){
		String message = "";
		switch(status){
			case 0 : message = "request failed!";break;
			case 1: message = "request succeed!"; break;
			case 500: message = "nothing gained!"; break;
			case 501: message = "wrong parameter!"; break;
		}
		
		return message;
	}
}
