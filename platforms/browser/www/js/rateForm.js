/**
 * Created by ZERG on 18.09.2017.
 */
var RateForm = function() {
    
    this.init = function() {
        var scope = this;
    }
    
    this.open = function() {
        app.closeMenu();
        $(".form").hide();
        $(".rate-form").show();
    }
    
    
    this.init();
}