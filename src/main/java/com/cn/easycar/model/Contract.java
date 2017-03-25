package com.cn.easycar.model;

public class Contract {
    private String month;

    private Integer vehicleNum;

    private Integer recordNum;

    private Integer contractNum;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month == null ? null : month.trim();
    }

    public Integer getVehicleNum() {
        return vehicleNum;
    }

    public void setVehicleNum(Integer vehicleNum) {
        this.vehicleNum = vehicleNum;
    }

    public Integer getRecordNum() {
        return recordNum;
    }

    public void setRecordNum(Integer recordNum) {
        this.recordNum = recordNum;
    }

    public Integer getContractNum() {
        return contractNum;
    }

    public void setContractNum(Integer contractNum) {
        this.contractNum = contractNum;
    }
}