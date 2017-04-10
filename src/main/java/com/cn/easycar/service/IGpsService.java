package com.cn.easycar.service;

import java.util.List;

import com.cn.easycar.model.CompanyIndicator;

public interface IGpsService {
	
	//获取公司名
	public String getCompanyName(int comId);
	
	//获取所有的公司评价指标
	public List<CompanyIndicator> getCompanyIndicators();
	
	//根据指标来获取(递增顺序)
	public List<CompanyIndicator> getCompanyIndicatorsByIndicators(String indicator);
	
	//根据指标来获取(递减顺序)
	public List<CompanyIndicator> getCompanyIndicatorsByIndicatorsDesc(String indicator);

}
