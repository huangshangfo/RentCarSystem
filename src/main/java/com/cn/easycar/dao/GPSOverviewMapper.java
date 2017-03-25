package com.cn.easycar.dao;

import java.util.List;

import com.cn.easycar.model.GPSOverview;

public interface GPSOverviewMapper {
    int deleteByPrimaryKey(String month);

    int insert(GPSOverview record);

    int insertSelective(GPSOverview record);

    GPSOverview selectByPrimaryKey(String month);

    int updateByPrimaryKeySelective(GPSOverview record);

    int updateByPrimaryKey(GPSOverview record);
    
    List<GPSOverview> selectAllGPS();
}