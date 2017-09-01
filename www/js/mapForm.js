/**
 * Created by ZERG on 31.08.2017.
 */
var MapForm = function() {

    this.mapCanvas = null;

    this.autocomplete = null;

    this.map = null;

    this.geocoder = null;

    this.markers = [];

    this.init = function() {
        var scope = this;
        $('#map-wrapper').height($(window).height() - 165);
        this.mapCanvas = document.getElementById("map-wrapper");
        this.map = plugin.google.maps.Map.getMap(this.mapCanvas);
        this.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
            scope.onMapReady();
        });
        $('#map-autocomplete').focus(function() {
            $('#map-wrapper').hide();
        });
        $('#map-autocomplete').blur(function() {
            $('#map-wrapper').show();
        });
    }
 
    this.onMapReady = function() {
        this.setCurrentPosition();
    }

    this.setCurrentPosition = function() {
        var scope = this;
        this.clearMarkers();
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            scope.map.animateCamera({
                target: {lat: lat, lng: lng},
                zoom: 17
            }, function() {
               app.washForm.latlng = {
                   lat: lat,
                   lng: lng
               };
               app.washForm.setAddress(app.washForm.latlng);
               var marker = scope.map.addMarker({
                    position: app.washForm.latlng,
                    animation: plugin.google.maps.Animation.BOUNCE
                });
                scope.markers.push(marker);
            });
        });
    }

    this.clearMarkers = function() {
        return;
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    this.open = function() {
        $('.form').hide();
        $('.map-form').show();
    }


    this.init();
}