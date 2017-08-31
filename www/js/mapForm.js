/**
 * Created by ZERG on 31.08.2017.
 */
var MapForm = function() {

    this.mapCanvas = null;

    this.map = null;

    this.marker = null;


    this.init = function() {
        var scope = this;
        $('#map-wrapper').height($(window).height() - 100);
        this.mapCanvas = document.getElementById("map-wrapper");
        this.map = plugin.google.maps.Map.getMap(this.mapCanvas, {

        });
        this.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
            scope.onMapReady();
        });
        
    }

    this.onMapReady = function() {
        var input = document.getElementById('map-input');
        var searchBox = plugin.google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
        this.setCurrentPosition();
    }

    this.setCurrentPosition = function() {
        var scope = this;
        if(this.marker != null) {
            this.marker.setMap(null);
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            scope.map.animateCamera({
                target: {lat: lat, lng: lng},
                zoom: 17
            }, function() {

               scope.marker = scope.map.addMarker({
                    position: {lat: lat, lng: lng},
                    animation: plugin.google.maps.Animation.BOUNCE
                });
            });
        });
    }

    this.open = function() {
        $('.form').hide();
        $('.map-form').show();
    }


    this.init();
}