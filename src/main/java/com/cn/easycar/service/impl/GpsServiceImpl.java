package com.cn.easycar.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.easycar.dao.CompanyIndicatorMapper;
import com.cn.easycar.dao.CompanyMapper;
import com.cn.easycar.model.CompanyIndicator;
import com.cn.easycar.service.IGpsService;

@Service("gpsService")
public class GpsServiceImpl implements IGpsService {
	@Resource
	private CompanyIndicatorMapper companyIndicatorMapper;
	
	@Resource
	private CompanyMapper companyMapper;

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

}
