package com.cn.easycar.dao;

import java.util.List;

import com.cn.easycar.model.Actor;

public interface ActorMapper {
    int deleteByPrimaryKey(Short actorId);

    int insert(Actor record);

    int insertSelective(Actor record);

    Actor selectByPrimaryKey(Short actorId);

    int updateByPrimaryKeySelective(Actor record);

    int updateByPrimaryKey(Actor record);
    
    List<Actor> selectAllActor();
}