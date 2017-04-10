package com.cn.easycar.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cn.easycar.model.CompanyIndicator;

public interface CompanyIndicatorMapper {
    int deleteByPrimaryKey(Integer comid);

    int insert(CompanyIndicator record);

    int insertSelective(CompanyIndicator record);

    CompanyIndicator selectByPrimaryKey(Integer comid);

    int updateByPrimaryKeySelective(CompanyIndicator record);

    int updateByPrimaryKey(CompanyIndicator record);
    
    List<CompanyIndicator> selectAllCompanyIndicators();
    
    List<CompanyIndicator> selectCompanyIndicators(@Param("indicator")String indicator); //递增
    
    List<CompanyIndicator> selectCompanyIndicatorsDesc(@Param("indicator")String indicator); //递减
}