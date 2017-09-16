/**
 * Created by ZERG on 29.08.2017.
 */
var User = function() {

    this.userData = null;

    this.init = function() {
        var userData = localStorage.getItem("user");
        if(userData != null) {
            this.userData = JSON.parse(userData);
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