package com.cn.easycar.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.easycar.dao.CompanyIndicatorMapper;
import com.cn.easycar.dao.CompanyMapper;
import com.cn.easycar.dao.VehicleGPSMapper;
import com.cn.easycar.model.CompanyIndicator;
import com.cn.easycar.model.VehicleGPS;
import com.cn.easycar.service.IGpsService;

@Service("gpsService")
public class GpsServiceImpl implements IGpsService {
	@Resource
	private CompanyIndicatorMapper companyIndicatorMapper;
	
	@Resource
	private CompanyMapper companyMapper;
	
	@Resource
	private VehicleGPSMapper vehicleGPSMapper;

	@Override
	public List<CompanyIndicator> getCompanyIndicators() {
		// TODO Auto-generated method stub
		List<CompanyIndicator> companyIndicators=new ArrayList<CompanyIndicator>();
		companyIndicators=companyIndicatorMapper.selectAllCompanyIndicators();
		return companyIndicators;
	}

	@Override
	public List<CompanyIndicator> getCompanyIndicatorsByIndicators(String indicator) {
		// TODO Auto-generated method stub
		List<CompanyIndicator> companyIndicators=new ArrayList<CompanyIndicator>();
		companyIndicators=companyIndicatorMapper.selectCompanyIndicators(indicator);
		return companyIndicators;
	}

	@Override
	public List<CompanyIndicator> getCompanyIndicatorsByIndicatorsDesc(String indicator) {
		List<CompanyIndicator> companyIndicators=new ArrayList<CompanyIndicator>();
		companyIndicators=companyIndicatorMapper.selectCompanyIndicatorsDesc(indicator);
		return companyIndicators;
	}

	@Override
	public String getCompanyName(int comId) {
		return companyMapper.selectCompanyName(comId);
	}

	@Override
	public List<String> getVehicles(String company, String date) {
		int comId=companyMapper.selectIdByCompanyName(company); //公司id
		date=date.replaceAll("-", "");
		return vehicleGPSMapper.selectPlateNumberByCIdDate(comId, date);
	}

	@Override
	public List<VehicleGPS> getGps(String plateNumber, String date) {
		date=date.replaceAll("-", "");
		
		return vehicleGPSMapper.selectByPlateNumberDate(plateNumber, date);
	}

	@Override
	public List<String> getDates(String company) {
		int comId=companyMapper.selectIdByCompanyName(company); //公司id
		List<String> dateL=vehicleGPSMapper.selectDateByComId(comId);
		List<String> dates=new ArrayList<String>();
		//需要修改日期格式
		for (String date : dateL) {
			StringBuilder  sb = new StringBuilder (date); 
			sb.insert(6, "-");
			sb.insert(4, "-");
			dates.add(sb.toString());
		}
		return dates;
	}

}
