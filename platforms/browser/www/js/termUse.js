/**
 * Created by ZERG on 22.01.2018.
 */
var TermUse = function() {

    this.init = function () {
        var scope = this;
    }

    this.open = function () {
        app.closeMenu();
        $(".client-term-use-wrapper").hide();
        $(".form").hide();
        $(".client-term-use-form").show();
        switch (app.lang.prefix) {
            case "ru":
                $(".client-term-use-wrapper.tu-ru").show();
                break;
            case "en":
                $(".client-term-use-wrapper.tu-en").show();
                break;
            case "tu":
                $(".client-term-use-wrapper.tu-tu").show();
                break;
        }

        app.back = function () {
            app.open();
        }
    }
}