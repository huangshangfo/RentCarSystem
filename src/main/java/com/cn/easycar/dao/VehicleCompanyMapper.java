package com.cn.easycar.dao;

import java.util.List;

import com.cn.easycar.model.VehicleCompany;

public interface VehicleCompanyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VehicleCompany record);

    int insertSelective(VehicleCompany record);

    VehicleCompany selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VehicleCompany record);

    int updateByPrimaryKey(VehicleCompany record);
    
    //批量插入
    int batchInsert(List<VehicleCompany> vcL);
}