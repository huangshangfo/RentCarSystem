package com.cn.easycar.dao;

import com.cn.easycar.model.CompanyIndicator;

public interface CompanyIndicatorMapper {
    int deleteByPrimaryKey(Integer comid);

    int insert(CompanyIndicator record);

    int insertSelective(CompanyIndicator record);

    CompanyIndicator selectByPrimaryKey(Integer comid);

    int updateByPrimaryKeySelective(CompanyIndicator record);

    int updateByPrimaryKey(CompanyIndicator record);
}