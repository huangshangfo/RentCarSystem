package com.cn.easycar.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

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
    
    List<String> selectPlateNumberByCIdDate(@Param("comid")Integer comid,@Param("date")String date);
    
    List<VehicleGPS> selectByPlateNumberDate(@Param("platenumber")String plateNumber,@Param("date")String date);
    
    List<String> selectDateByComId(@Param("comid")Integer comid);
}