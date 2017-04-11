package com.cn.easycar.service;

import java.util.List;

import com.cn.easycar.model.CompanyIndicator;
import com.cn.easycar.model.VehicleGPS;

public interface IGpsService {
	
	//获取公司名
	public String getCompanyName(int comId);
	
	//获取所有的公司评价指标
	public List<CompanyIndicator> getCompanyIndicators();
	
	//根据指标来获取(递增顺序)
	public List<CompanyIndicator> getCompanyIndicatorsByIndicators(String indicator);
	
	//根据指标来获取(递减顺序)
	public List<CompanyIndicator> getCompanyIndicatorsByIndicatorsDesc(String indicator);
	
	//获取按要求的车辆车牌号
	public List<String> getVehicles(String company,String date);
	
	//获取某辆车某天的GPS
	public List<VehicleGPS> getGps(String plateNumber,String date);
	
	//获取某公司有GPS的日期
	public List<String> getDates(String company);

}
