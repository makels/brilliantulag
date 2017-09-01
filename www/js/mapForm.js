/**
 * Created by ZERG on 31.08.2017.
 */
var MapForm = function() {

    this.mapCanvas = null;

    this.autocomplete = null;

    this.map = null;

    this.geocoder = null;

    this.marker = null;


    this.init = function() {
        var scope = this;
        $('#map-wrapper').height($(window).height() - 165);
        this.mapCanvas = document.getElementById("map-wrapper");
        this.map = plugin.google.maps.Map.getMap(this.mapCanvas);
        this.map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
            scope.onMapReady();
            scope.initAutocomplete();
            $('body').on('touchstart','.pac-container', function(e){
                e.stopImmediatePropagation();
            })
        });

    }

    this.initAutocomplete = function() {
        var scope = this;
        try {
        scope.autocomplete = new google.maps.places.Autocomplete(document.getElementById('map-autocomplete'), {types: ['geocode']});
        scope.autocomplete.addListener('place_changed', function() {
            var place = scope.autocomplete.getPlace();
            app.washForm.latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lat()
            };
            scope.map.animateCamera({
                target: app.washForm.latlng,
                zoom: 17
            }, function() {
                app.washForm.setAddress(app.washForm.latlng);
                scope.marker = scope.map.addMarker({
                    position: {lat: lat, lng: lng},
                    animation: plugin.google.maps.Animation.BOUNCE
                });
            });
        });
        } catch (e) {
            app.log(e.message);
        }
    }
    
    this.onMapReady = function() {
        this.setCurrentPosition();
    }

    this.setCurrentPosition = function() {
        var scope = this;

        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            scope.map.animateCamera({
                target: {lat: lat, lng: lng},
                zoom: 17
            }, function() {
               app.washForm.latlng = {
                   lat: parseFloat(lat),
                   lng: parseFloat(lng)
               };
               app.washForm.setAddress(app.washForm.latlng);
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