package com.cn.easycar.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.easycar.model.Actor;
import com.cn.easycar.service.ITestService;
import com.cn.easycar.util.MyJSON;

@Controller
@RequestMapping("/test")
public class TestController {
	@Resource
	private ITestService testService;
	
	@RequestMapping(value="/getName", method = RequestMethod.GET)
	public @ResponseBody String getName(String name){
		return MyJSON.toJSON(name, 1);
	}
	
	@RequestMapping(value="/actors", method = RequestMethod.GET)
	public @ResponseBody String getAllActors(){
		List<Actor> actors=new ArrayList();
		actors=testService.getAllActors();
		return MyJSON.toJSON(actors, 1);
	}

}
