package com.cn.easycar.model;

//返回前端的公司指标信息
public class CompanyParam {
	private String companyName;
	private float repeatRate;
	private float highActiveRate;
	private float gpsDensity;
	
	public CompanyParam(){}
	
	public CompanyParam(String companyName, float repeatRate, float highActiveRate, float gpsDensity) {
		super();
		this.companyName = companyName;
		this.repeatRate = repeatRate;
		this.highActiveRate = highActiveRate;
		this.gpsDensity = gpsDensity;
	}
	
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public float getRepeatRate() {
		return repeatRate;
	}
	public void setRepeatRate(float repeatRate) {
		this.repeatRate = repeatRate;
	}
	public float getHighActiveRate() {
		return highActiveRate;
	}
	public void setHighActiveRate(float highActiveRate) {
		this.highActiveRate = highActiveRate;
	}
	public float getGpsDensity() {
		return gpsDensity;
	}
	public void setGpsDensity(float gpsDensity) {
		this.gpsDensity = gpsDensity;
	}

}
