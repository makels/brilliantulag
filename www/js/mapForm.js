/**
 * Created by ZERG on 31.08.2017.
 */
var MapForm = function() {

    this.mapCanvas = null;

    this.map = null;


    this.init = function() {
        var scope = this;
        $('#map-wrapper').height($(window).height() - 100);
        this.mapCanvas = document.getElementById("map-wrapper");
        this.map = plugin.google.maps.Map.getMap(this.mapCanvas);
        this.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
            scope.onMapReady();
        });
    }

    this.onMapReady = function() {
        var scope = this;
        this.map.getMyLocation(function(location) {
            app.washForm.latlng = location.latLng;
            scope.map.addMarker({
                'position': location.latLng,
                'title': msg
            }, function(marker) {
                marker.showInfoWindow();
            });
        });
    }

    this.setCurrentPosition = function() {
        var scope = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            scope.map.LatLng(position.coords);
        });
    }

    this.open = function() {
        $('.form').hide();
        $('.map-form').show();
    }


    this.init();
}