package com.cn.easycar.util;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cn.easycar.dao.CompanyIndicatorMapper;
import com.cn.easycar.dao.CompanyMapper;
import com.cn.easycar.dao.VehicleCompanyMapper;
import com.cn.easycar.dao.VehicleGPSMapper;
import com.cn.easycar.model.CompanyIndicator;
import com.cn.easycar.model.VehicleCompany;
import com.cn.easycar.model.VehicleGPS;

public class StoreInfo {

	private static ApplicationContext ac = new ClassPathXmlApplicationContext(new String("applicationContext.xml"));
	private static String comVeFilePath = "G:\\桌面文件夹\\学习\\毕业设计\\租赁车数据\\10月份数据\\备案数据\\companyid_vehicle.csv";
	private static String veGpsFilePath = "G:\\桌面文件夹\\学习\\毕业设计\\租赁车数据\\10月份数据\\GPS数据\\短租";
	
	public static void main(String[] args) throws Exception {
		// storeVehicleCommpany(); //存车牌号-公司id
		storeVehicleGps(); //存车辆-gps数据
		//Statistics(); //统计参数指标
		/*CompanyIndicatorMapper companyIndicatorMapper=(CompanyIndicatorMapper) ac.getBean("companyIndicatorMapper");
		List<CompanyIndicator> ciL=companyIndicatorMapper.selectCompanyIndicators("repeatRate");
		for (CompanyIndicator companyIndicator : ciL) {
			System.out.println(companyIndicator.getRepeatrate());
		}*/
	}

	// 存车牌号-公司id
	public static void storeVehicleCommpany() throws UnsupportedEncodingException {
		
		CompanyMapper companyMapper = (CompanyMapper) ac.getBean("companyMapper");
		VehicleCompanyMapper vehicleCompanyMapper = (VehicleCompanyMapper) ac.getBean("vehicleCompanyMapper");

		List<String> zulinIds = new ArrayList<String>(); // 数据库中存有的公司id
		zulinIds = companyMapper.selectAllZulinIds();

		List<VehicleCompany> vcL = new ArrayList<VehicleCompany>(); // 要插入VehicleCompany列表

		// 读取csv文件
		File comVeFile = new File(comVeFilePath);
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(comVeFile), "GBK"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		String line = "";
		int row = 0;
		try {
			List<String> allString = new ArrayList<>();
			while ((line = br.readLine()) != null) // 读取到的内容给line变量
			{
				row++;
				if (row == 1) { // 第一行为表头
					continue;
				}

				String content[] = line.split(",");
				String zulinId = content[1].replaceAll("\"", ""); // 去除原始数据中的双引号
				String platNumber = content[2].replaceAll("\"", "");
				if (zulinId.trim().isEmpty() || platNumber.trim().isEmpty()) // 公司租赁id或车牌号为空
					continue;

				if (!zulinIds.contains(zulinId)) // 如果该公司id不在数据库中
					continue;

				VehicleCompany vC = new VehicleCompany();
				vC.setZulinid(zulinId);
				vC.setPlatenumber(platNumber);
				vcL.add(vC);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		if (!vcL.isEmpty()) {
			System.out.println(row + "    " + vcL.size());
			vehicleCompanyMapper.batchInsert(vcL); // 批量插入
		} else {
			System.out.println(row + "    " + vcL.size());
		}
	}

	// 存车牌号-GPS
	public static void storeVehicleGps() throws Exception {

		VehicleCompanyMapper vehicleCompanyMapper = (VehicleCompanyMapper) ac.getBean("vehicleCompanyMapper");
		VehicleGPSMapper vehicleGPSMapper = (VehicleGPSMapper) ac.getBean("vehicleGPSMapper");
		CompanyMapper companyMapper = (CompanyMapper) ac.getBean("companyMapper");
		
		List<String> validPlateNumbers=vehicleCompanyMapper.selectAllPlateNumber(); //所有在数据库中存有的车牌号
		
		File file = new File(veGpsFilePath); // 打开目录
		File[] fileList = file.listFiles();
		int fileNum = fileList.length;
		for (int i = 0; i < fileNum; i++) {
			List<VehicleGPS> vgL=new ArrayList<VehicleGPS>();
			if (fileList[i].isFile()) {
				String tmpString = fileList[i].toString();
				String date = tmpString.split("\\\\")[8].split("\\.")[0]; // gps上传日期
				BufferedReader br = null;
				try {
					br = new BufferedReader(new InputStreamReader(new FileInputStream(fileList[i]), "GBK"));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
				String line = "";
				int row=0;
				while((line=br.readLine())!=null){
					row++;
					String content[] = line.split(",");
					String plateNumber=content[2].toString(); //车牌号
					if(!validPlateNumbers.contains(plateNumber)) //该车牌号不在数据库中   可缩短时间，因为每个车牌号有多行
						continue;
					
					double lng=Double.parseDouble(content[7]); //经度
					double lat=Double.parseDouble(content[8]); //纬度
					Gps bdGps=Coordtransform.transform2Bd(lat,lng); //将普通GPS转换成百度坐标
					int comId=companyMapper.selectIdByPlateNumber(plateNumber); //公司id
					
					VehicleGPS vg=new VehicleGPS();
					vg.setDate(date);
					vg.setPlatenumber(plateNumber);
					vg.setLng(bdGps.getWgLon());
					vg.setLat(bdGps.getWgLat());
					vg.setComid(comId);
					vgL.add(vg);
				}
				vehicleGPSMapper.batchInsert(vgL); //插入一天的vehicleGPs
				System.out.println("日期："+date+" 有"+row+"条GPS");
			}
		}
	}
	
	//统计参数指标
	public static void Statistics(){
		
		VehicleGPSMapper vehicleGPSMapper = (VehicleGPSMapper) ac.getBean("vehicleGPSMapper");
		CompanyMapper companyMapper = (CompanyMapper) ac.getBean("companyMapper");
		CompanyIndicatorMapper companyIndicatorMapper=(CompanyIndicatorMapper) ac.getBean("companyIndicatorMapper");
		
		int[][] companyVeNum=new int[37][32];  //36家公司31天上传了GPS的车辆数
		int[][] companyActiveNum=new int[37][32]; //36家公司31天高频活跃的车辆数（GPS上传时间间隔小于2分钟的车辆）
		float[][] companyQualifiedGpsDensity=new float[37][32]; //36家公司31天合格gps密度
		
		String month="201610";
		
		//按天循环
		for(int i=1;i<=31;i++){
			//获得日期
			String date="";
			if(i<10){
				date=month+"0"+i;
			}
			else{
				date=month+i;
			}
			
			List<VehicleGPS> vgL=vehicleGPSMapper.selectByDate(date);
			//List<String> pnL=vehicleGPSMapper.selectPlateNumberByDate(date);
			
			String plateNumber0=""; //当前车辆的上一车辆的车牌号
			int gpsNum=0; //某辆车一天的gps数量
			int qualifiedGPSNum=0; //合格gps数量
			Gps gps0=new Gps();
			Gps gps1=new Gps();
			int comId=0;
			for (VehicleGPS vehicleGPS: vgL) {
				String plateNumber=vehicleGPS.getPlatenumber(); 
				if(plateNumber.equals(plateNumber0)){ //和上一车是同一车牌号
					gpsNum++;
					gps1=new Gps(vehicleGPS.getLat(),vehicleGPS.getLng());
					double dis=DistanceComputer.getDistance(gps0.getWgLat(), gps0.getWgLon(), gps1.getWgLat(), gps1.getWgLon());
					if(dis<1000){  //认为GPS距离小于1000米为合格距离
						qualifiedGPSNum++;
					}
					gps0=gps1;
				}
				else{ //不同车辆
					
					if(gpsNum!=0){                            //该辆车当天的gps数量已统计完
						float avgMin=1440/(float)gpsNum;      //上传一条gps的时间间隔（1440=24h*60min)
						if(avgMin<2){                         //规定GPS上传时间间隔小于2分钟的车辆定义为高频活跃车辆
							companyActiveNum[comId][i]++; 
						}
						companyQualifiedGpsDensity[comId][i]=(float)qualifiedGPSNum/(float)gpsNum;
					}
					
					comId=companyMapper.selectIdByPlateNumber(plateNumber); //公司id
					companyVeNum[comId][i]++; //公司的车辆数加1
					
					gps0=new Gps(vehicleGPS.getLat(),vehicleGPS.getLng());
					gpsNum=1;
					qualifiedGPSNum=1;
					plateNumber0=plateNumber;
				}
			}
		}
		for(int i=1;i<=36;i++){
			System.out.println("==================================\n公司"+i+": ");
			int veNum=0; int activeNum=0; float qualifiedGPSDensity=0; int notZero=0; float totalQualifiedGPS=0;
			for(int j=1;j<=31;j++){
				veNum+=companyVeNum[i][j];
				activeNum+=companyActiveNum[i][j];
				qualifiedGPSDensity+=companyQualifiedGpsDensity[i][j];
				if(companyQualifiedGpsDensity[i][j]>0.0001)
					notZero++;
				//System.out.println("活跃车辆总数："+companyVeNum[i][j]+", 高频活跃车辆数："+companyActiveNum[i][j]+", 合格GPS密度："+companyQualifiedGpsDensity[i][j]*100+"%");
			}
			if(notZero==0)
				totalQualifiedGPS=0;
			else
				totalQualifiedGPS=qualifiedGPSDensity/notZero;
			System.out.println("活跃车辆总数："+veNum+", 高频活跃车辆总数："+activeNum+", 合格GPS密度："+totalQualifiedGPS*100+"%");
			
			if(veNum!=0){
				CompanyIndicator companyIndicator=new CompanyIndicator();
				companyIndicator.setComid(i);
				companyIndicator.setHighactiverate((float)activeNum/(float)veNum);
				companyIndicator.setGpsdensity(totalQualifiedGPS);
				companyIndicatorMapper.insertSelective(companyIndicator);
			}
		}
	}
}
