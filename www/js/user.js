/**
 * Created by ZERG on 29.08.2017.
 */
var User = function() {

    this.userData = {};

    this.init = function() {
        var userData = localStorage.getItem("user");
        if(userData != null) {
            try {
                this.userData = JSON.parse(userData);
            } catch (ex) {
                localStorage.removeItem("user");
            }

        }
    }

    this.getUserData = function() {
        return this.userData;
    }

    this.setUserData = function(data) {
        this.userData = data;
        localStorage.setItem('user', JSON.stringify(data));
    }

    this.init();
}