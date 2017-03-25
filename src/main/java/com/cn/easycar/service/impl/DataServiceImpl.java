package com.cn.easycar.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.easycar.dao.ContractMapper;
import com.cn.easycar.dao.GPSOverviewMapper;
import com.cn.easycar.model.Contract;
import com.cn.easycar.model.GPSOverview;
import com.cn.easycar.service.IDataService;

@Service("dataService")
public class DataServiceImpl implements IDataService {

	@Resource
	private ContractMapper contractMapper;
	@Resource
	private GPSOverviewMapper gpsOverviewMapper;
	
	@Override
	public List<Contract> getContracts() {
		List<Contract> contracts=new ArrayList<>();
		contracts=contractMapper.selectAllContract();
		return contracts;
	}
	
	@Override
	public List<GPSOverview> getGpsOverviews() {
		List<GPSOverview> gpsOverviews=new ArrayList<>();
		gpsOverviews=gpsOverviewMapper.selectAllGPS();
		return gpsOverviews;
	}

}
