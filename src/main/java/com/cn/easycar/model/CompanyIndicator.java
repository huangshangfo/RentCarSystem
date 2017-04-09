package com.cn.easycar.model;

public class CompanyIndicator {
    private Integer comid;

    private Float repeatrate;

    private Float highactiverate;

    private Float gpsdensity;

    private Float dailydiffrate;

    private Float wronggpsrate;

    public Integer getComid() {
        return comid;
    }

    public void setComid(Integer comid) {
        this.comid = comid;
    }

    public Float getRepeatrate() {
        return repeatrate;
    }

    public void setRepeatrate(Float repeatrate) {
        this.repeatrate = repeatrate;
    }

    public Float getHighactiverate() {
        return highactiverate;
    }

    public void setHighactiverate(Float highactiverate) {
        this.highactiverate = highactiverate;
    }

    public Float getGpsdensity() {
        return gpsdensity;
    }

    public void setGpsdensity(Float gpsdensity) {
        this.gpsdensity = gpsdensity;
    }

    public Float getDailydiffrate() {
        return dailydiffrate;
    }

    public void setDailydiffrate(Float dailydiffrate) {
        this.dailydiffrate = dailydiffrate;
    }

    public Float getWronggpsrate() {
        return wronggpsrate;
    }

    public void setWronggpsrate(Float wronggpsrate) {
        this.wronggpsrate = wronggpsrate;
    }
}