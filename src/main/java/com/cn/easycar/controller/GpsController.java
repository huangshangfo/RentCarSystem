package com.cn.easycar.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cn.easycar.model.CompanyIndicator;
import com.cn.easycar.model.CompanyParam;
import com.cn.easycar.service.IGpsService;
import com.cn.easycar.util.MyJSON;

@Controller
@RequestMapping("/gps")
public class GpsController {
	@Resource
	private IGpsService gpsService;

	@RequestMapping(value = "/companys", method = RequestMethod.GET)
	public @ResponseBody String getIndicators(String indicators) {
		if(indicators.trim().isEmpty()){
			return MyJSON.toJSON("none", 500);
		}
		String[] indicatorL = indicators.split(",");
		int indNum = indicatorL.length; // 指标个数

		List<List<CompanyIndicator>> companyIndicatorsL=new ArrayList<List<CompanyIndicator>>();

		for (int i = 0; i < indNum; i++) {
			String indicator = indicatorL[i];
			List<CompanyIndicator> tmp=new ArrayList<CompanyIndicator>();
			if (indicator.equals("repeatRate")) {
				tmp = gpsService.getCompanyIndicatorsByIndicators(indicator); // 按指标递增排序
			} else {
				tmp = gpsService.getCompanyIndicatorsByIndicatorsDesc(indicator); // 按指标递减排序
			}
			companyIndicatorsL.add(tmp);
		}

		List<CompanyIndicator> resultCompanyIndicator=new ArrayList<CompanyIndicator>(); 

		if (indNum == 1) // 只有一个指标
			resultCompanyIndicator = companyIndicatorsL.get(0);
		else {  //多个指标需要综合排序
			int comNum = companyIndicatorsL.get(0).size(); // 公司数目
			// int score[]=new int[comNum]; //各公司的评价分数
			Map<Integer, Integer> scoreMap = new HashMap<Integer, Integer>(); // 各公司的评价分数
			CompanyIndicator tmpIndicator;
			for (int i = 0; i < comNum; i++) {
				int score = comNum - i;
				tmpIndicator = companyIndicatorsL.get(0).get(i);
				for (int j = 1; j < indNum; j++) {
					int dex = getIdx(companyIndicatorsL.get(j),tmpIndicator.getComid()); //在另外的指标中排序位置
					score += (comNum - dex); // 该公司在另外的指标中的分数
				}
				scoreMap.put(i, score);
			}
			while (scoreMap.size() > 0) {
				int com = getKeyOfMaxValue(scoreMap);
				resultCompanyIndicator.add(companyIndicatorsL.get(0).get(com));
				scoreMap.remove(com);
			}
		}
		
		//将结果转换成前端显示的数据
		List<CompanyParam> companyParams=new ArrayList<CompanyParam>();
		for (CompanyIndicator companyIndicator : resultCompanyIndicator) {
			int comId=companyIndicator.getComid(); //公司id
			String comName=gpsService.getCompanyName(comId);
			companyParams.add(new CompanyParam(comName,companyIndicator.getRepeatrate(),companyIndicator.getHighactiverate(),companyIndicator.getGpsdensity()));
		}

		if (!companyParams.isEmpty())
			return MyJSON.toJSON(companyParams, 1);
		else
			return MyJSON.toJSON("", 0);
	}

	// 找到Map中对应最大值的Key
	public int getKeyOfMaxValue(Map<Integer, Integer> map) {
		int max = -1;
		int key = 0;
		Iterator<Map.Entry<Integer, Integer>> entries = map.entrySet().iterator();
		while (entries.hasNext()) {
			Map.Entry<Integer, Integer> entry = entries.next();
			if (max < entry.getValue()) {
				max = entry.getValue();
				key = entry.getKey();
			}
		}
		return key;
	}
	
	public int getIdx(List<CompanyIndicator> list,int comId){
		int idx=0;
		for (CompanyIndicator companyIndicator : list) {
			if(companyIndicator.getComid()==comId)
				break;
			idx++;
		}
		return idx;
	}
}
