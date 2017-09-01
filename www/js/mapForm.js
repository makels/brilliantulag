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
        });

        $('#map-autocomplete').change(function() {
            plugin.google.maps.Geocoder.geocode({'address': $(this).val()}, function(results) {
                if (results.length) {
                    var result = results[0];
                    var position = result.position;

                    this.map.addMarker({
                        'position': position,
                        'title':  JSON.stringify(result.position)
                    }, function(marker) {

                        this.map.animateCamera({
                            'target': position,
                            'zoom': 17
                        }, function() {
                            marker.showInfoWindow();
                        });

                    });
                } else {
                    app.log("fail");
                }
            });
        });
        
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