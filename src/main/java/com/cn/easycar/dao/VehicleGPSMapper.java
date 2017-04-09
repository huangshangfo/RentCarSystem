package com.cn.easycar.dao;

import java.util.List;

import com.cn.easycar.model.VehicleGPS;

public interface VehicleGPSMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VehicleGPS record);

    int insertSelective(VehicleGPS record);

    VehicleGPS selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VehicleGPS record);

    int updateByPrimaryKey(VehicleGPS record);
    
    //批量插入
    int batchInsert(List<VehicleGPS> vgL);
    
    List<VehicleGPS> selectByDate(String date);
    
    List<String>  selectPlateNumberByDate(String date);
}