/**
 * Created by ZERG on 31.08.2017.
 */
var MapForm = function() {

    this.mapCanvas = null;

    this.map = null;


    this.init = function() {
        var scope = this;
        $('#map-wrapper').height($(window).height() - 100);
        navigator.geolocation.getCurrentPosition(function(position) {
            var element = document.getElementById('map-canvas');
            var lat = position.coords.latitude;
            var lang = position.coords.longitude;
            var myLatlng = new google.maps.LatLng(lat, lang);
            var mapOptions = {
                zoom: 4,
                center: myLatlng
            }
            //Creates a new map inside the <div> element
            scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            //A marker identifies a location on a map.
            var marker = new google.maps.Marker(
                {
                    position: myLatlng,
                    map: scope.map
                });
        });
    }

    this.open = function() {
        $('.form').hide();
        $('.map-form').show();
    }


    this.init();
}