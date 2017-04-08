package com.cn.easycar.model;

public class Company {
    private Integer id;

    private String zulinid;

    private String name;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }
}