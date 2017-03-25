package com.cn.easycar.service;

import java.util.List;

import com.cn.easycar.model.Contract;
import com.cn.easycar.model.GPSOverview;

public interface IDataService {
	public List<Contract> getContracts();
	public List<GPSOverview> getGpsOverviews();

}
