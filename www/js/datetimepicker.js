/**
 * Created by ZERG on 19.09.2017.
 */
var DateTimePicker = function() {

    this.date = 0;

    this.success = null;
    
    this.init = function() {
        var scope = this;
        this.date = moment();
        this.date.minutes(0);
        this.update();
    }
    
    this.select = function(success) {
        app.showMask();
        $('.date-wrapper').show();
        this.success = success;
    }

    this.now = function() {
        this.date = moment();
        this.date.minutes(0);
        this.update();
        this.ok();
    }

    this.ok = function() {
        app.hideMask();
        $('.date-wrapper').hide();
        this.success({
            str: this.date.format("DD.MM.YYYY HH:mm"),
            val: this.date
        });
    }

    this.addDay = function() {
        this.date = moment(this.date).add(1, "day");
        this.update();
    }

    this.addMonth = function() {
        this.date = moment(this.date).add(1, "month");
        this.update();
    }

    this.addHour = function() {
        this.date = moment(this.date).add(1, "hour");
        this.update();
    }

    this.addMinutes = function() {
        this.date = moment(this.date).add(30, "minutes");
        this.update();
    }

    this.minusDay = function() {
        this.date = moment(this.date).subtract(1, "day");
        this.update();
    }

    this.minusMonth = function() {
        this.date = moment(this.date).subtract(1, "month");
        this.update();
    }

    this.minusHour = function() {
        this.date = moment(this.date).subtract(1, "hour");
        this.update();
    }

    this.minusMinutes = function() {
        this.date = moment(this.date).subtract(30, "minutes");
        this.update();
    }

    this.update = function() {
        $("#day").html(moment(this.date).format("DD"));
        $("#month").html(moment(this.date).format("MM"));
        $("#hours").html(moment(this.date).format("HH"));
        $("#minutes").html(moment(this.date).format("mm"));
    }
    
    this.init();
    
    
}