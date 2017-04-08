package com.cn.easycar.util;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cn.easycar.dao.CompanyMapper;
import com.cn.easycar.dao.VehicleCompanyMapper;
import com.cn.easycar.model.VehicleCompany;

public class StoreInfo {
	
	private static String comVeFilePath="G:\\桌面文件夹\\学习\\毕业设计\\租赁车数据\\10月份数据\\备案数据\\companyid_vehicle.csv";

	public static void main(String[] args) throws UnsupportedEncodingException {
		// TODO Auto-generated method stub
		//storeVehicleCommpany(); //存车牌号-公司id
		Gps bdGps=Coordtransform.transform2Bd(39.849467, 116.353467);
		System.out.println(bdGps.getWgLat()+"   "+bdGps.wgLon);
	}
	
	//存车牌号-公司id
	public static void storeVehicleCommpany() throws UnsupportedEncodingException{
		ApplicationContext ac = new ClassPathXmlApplicationContext(new String("applicationContext.xml"));
		CompanyMapper companyMapper=(CompanyMapper)ac.getBean("companyMapper");
		VehicleCompanyMapper vehicleCompanyMapper=(VehicleCompanyMapper)ac.getBean("vehicleCompanyMapper");
		
		List<String> zulinIds=new ArrayList<String>(); //数据库中存有的公司id
		zulinIds=companyMapper.selectAllZulinIds();
		
		List<VehicleCompany> vcL=new ArrayList<VehicleCompany>(); //要插入VehicleCompany列表
		
		//读取csv文件
		File comVeFile=new File(comVeFilePath);
		BufferedReader br = null;
	    try
	    {
	        br = new BufferedReader(new InputStreamReader(new FileInputStream(comVeFile),"GBK"));
	    } catch (FileNotFoundException e)
	    {
	        e.printStackTrace();
	    }
	    String line = "";
	    int row=0;
	    try {
	            List<String> allString = new ArrayList<>();
	            while ((line = br.readLine()) != null)  //读取到的内容给line变量
	            {
	            	row++;
	            	if(row==1){ //第一行为表头
	            		continue;
	            	}
	            		
	            	String content[]=line.split(",");
	            	String zulinId=content[1].replaceAll("\"", ""); //去除原始数据中的双引号
	            	String platNumber=content[2].replaceAll("\"", "");
	            	if(zulinId.trim().isEmpty()||platNumber.trim().isEmpty()) //公司租赁id或车牌号为空
	            		continue;
	            	
	            	if(!zulinIds.contains(zulinId)) //如果该公司id不在数据库中
	            		continue;
	            	
	            	VehicleCompany vC=new VehicleCompany();
	            	vC.setZulinid(zulinId);
	            	vC.setPlatenumber(platNumber);
	            	vcL.add(vC);
	            }
	    } catch (IOException e)
	    {
	        e.printStackTrace();
	    }
	    
	    if(!vcL.isEmpty()){
	    	System.out.println(row+"    "+vcL.size());
	    	vehicleCompanyMapper.batchInsert(vcL); //批量插入
	    }
	    else{
	    	System.out.println(row+"    "+vcL.size());
	    }
	}
	
}
