package com.cn.easycar.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cn.easycar.dao.ActorMapper;
import com.cn.easycar.model.Actor;
import com.cn.easycar.service.ITestService;

@Service("testService")
public class TestServiceImp implements ITestService{
	@Resource
	private ActorMapper actorMapper;
	
	@Override
	public List<Actor> getAllActors(){
		return actorMapper.selectAllActor();
	}

}
