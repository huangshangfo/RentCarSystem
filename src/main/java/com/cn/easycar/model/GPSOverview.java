package com.cn.easycar.model;

public class GPSOverview {
    private String month;

    private Integer timeVehicle;

    private Integer timeGps;

    private Integer shortVehicle;

    private Integer shortGps;

    private Integer longVehicle;

    private Integer longGps;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month == null ? null : month.trim();
    }

    public Integer getTimeVehicle() {
        return timeVehicle;
    }

    public void setTimeVehicle(Integer timeVehicle) {
        this.timeVehicle = timeVehicle;
    }

    public Integer getTimeGps() {
        return timeGps;
    }

    public void setTimeGps(Integer timeGps) {
        this.timeGps = timeGps;
    }

    public Integer getShortVehicle() {
        return shortVehicle;
    }

    public void setShortVehicle(Integer shortVehicle) {
        this.shortVehicle = shortVehicle;
    }

    public Integer getShortGps() {
        return shortGps;
    }

    public void setShortGps(Integer shortGps) {
        this.shortGps = shortGps;
    }

    public Integer getLongVehicle() {
        return longVehicle;
    }

    public void setLongVehicle(Integer longVehicle) {
        this.longVehicle = longVehicle;
    }

    public Integer getLongGps() {
        return longGps;
    }

    public void setLongGps(Integer longGps) {
        this.longGps = longGps;
    }
}