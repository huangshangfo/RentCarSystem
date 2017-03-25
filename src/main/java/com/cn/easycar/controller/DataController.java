package com.cn.easycar.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.easycar.model.Contract;
import com.cn.easycar.model.GPSOverview;
import com.cn.easycar.service.IDataService;
import com.cn.easycar.util.MyJSON;

@Controller
@RequestMapping("/data")
public class DataController {
	@Resource
	private IDataService dataService;

	//获取合同数据
	@RequestMapping(value="/contracts", method = RequestMethod.GET)
	public @ResponseBody String getAllContract(){
		List<Contract> contracts=new ArrayList<>();
		contracts=dataService.getContracts();
		if(!contracts.isEmpty())
			return MyJSON.toJSON(contracts, 1);
		else
			return MyJSON.toJSON("", 0);
	}
	
	//获取GPS数据概况
	@RequestMapping(value="/gpsdata", method = RequestMethod.GET)
	public @ResponseBody String getAllGPS(){
		List<GPSOverview> gpsOverviews=new ArrayList<>();
		gpsOverviews=dataService.getGpsOverviews();
		if(!gpsOverviews.isEmpty())
			return MyJSON.toJSON(gpsOverviews, 1);
		else
			return MyJSON.toJSON("", 0);
	}

}
