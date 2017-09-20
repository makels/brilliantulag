/**
 * Created by ZERG on 18.09.2017.
 */
var RateForm = function() {
    
    this.init = function() {
        var scope = this;
    }
    
    this.open = function() {
        if(localStorage.getItem("current_order") == null) {
            app.message.show(app.lang.get("Ошибка"), app.lang.get("Вы не оформили заказ"));
            app.open();
            return;
        }
        app.closeMenu();
        $(".form").hide();
        $(".rate-form").show();

        app.back = function() {
            app.open();
        }
    }
    
    
    this.init();
}