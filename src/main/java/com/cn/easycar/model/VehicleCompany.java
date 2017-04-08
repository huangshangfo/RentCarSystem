package com.cn.easycar.model;

public class VehicleCompany {
    private Integer id;

    private String zulinid;

    private String platenumber;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getZulinid() {
        return zulinid;
    }

    public void setZulinid(String zulinid) {
        this.zulinid = zulinid == null ? null : zulinid.trim();
    }

    public String getPlatenumber() {
        return platenumber;
    }

    public void setPlatenumber(String platenumber) {
        this.platenumber = platenumber == null ? null : platenumber.trim();
    }
}