package com.cn.easycar.util;

public class Gps {
	public double wgLat;
	public double wgLon;
	
	public Gps(){};

	public Gps(double wgLat, double wgLon) {
		super();
		setWgLat(wgLat);
		setWgLon(wgLon);
	}

	public double getWgLat() {
		return wgLat;
	}

	public void setWgLat(double wgLat) {
		this.wgLat = wgLat;
	}

	public double getWgLon() {
		return wgLon;
	}

	public void setWgLon(double wgLon) {
		this.wgLon = wgLon;
	}
}
