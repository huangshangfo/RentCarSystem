package com.cn.easycar.dao;

import com.cn.easycar.model.VehicleGPS;

public interface VehicleGPSMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VehicleGPS record);

    int insertSelective(VehicleGPS record);

    VehicleGPS selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VehicleGPS record);

    int updateByPrimaryKey(VehicleGPS record);
}