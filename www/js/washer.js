/**
 * Created by ZERG on 16.09.2017.
 */
var Washer = function() {

    this.washerData = null;

    this.init = function() {
        var washerData = localStorage.getItem("washer");
        if(washerData != null) {
            try {
                this.washerData = JSON.parse(washerData);
            } catch (ex) {
                localStorage.removeItem("washer");
            }

        }
    }

    this.getWasherData = function() {
        return this.washerData;
    }

    this.setWasherData = function(data) {
        this.washerData = data;
        localStorage.setItem('washer', JSON.stringify(data));
    }

    this.init();
}