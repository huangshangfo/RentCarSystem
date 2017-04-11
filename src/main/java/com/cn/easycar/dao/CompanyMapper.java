package com.cn.easycar.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cn.easycar.model.Company;

public interface CompanyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Company record);

    int insertSelective(Company record);

    Company selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Company record);

    int updateByPrimaryKey(Company record);
    
    List<String> selectAllZulinIds(); //获取所有公司的租赁id
    
    int selectIdByPlateNumber(String plateNumber);
    
    String selectCompanyName(Integer id);
    
    int selectIdByCompanyName(@Param("name")String company);
}