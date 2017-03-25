package com.cn.easycar.dao;

import java.util.List;

import com.cn.easycar.model.Contract;

public interface ContractMapper {
    int deleteByPrimaryKey(String month);

    int insert(Contract record);

    int insertSelective(Contract record);

    Contract selectByPrimaryKey(String month);

    int updateByPrimaryKeySelective(Contract record);

    int updateByPrimaryKey(Contract record);
    
    List<Contract> selectAllContract();
}