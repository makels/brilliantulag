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
        var request = {
            'position': ""
        };
        plugin.google.maps.Geocoder.geocode(request, function(results) {
            if (results.length) {
                var result = results[0];
                var position = result.position;
                var address = [
                    result.subThoroughfare || "",
                    result.thoroughfare || "",
                    result.locality || "",
                    result.adminArea || "",
                    result.postalCode || "",
                    result.country || ""].join(", ");

                scope.map.addMarker({
                    'position': position,
                    'title':  address
                });
            } else {
                app.message.show("Error", "Not found");
            }
        });
    }

    this.open = function() {
        $('.form').hide();
        $('.map-form').show();
    }


    this.init();
}