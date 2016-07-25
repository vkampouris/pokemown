document.addEventListener("DOMContentLoaded", function () {
    if (!Notification) {
        console.log('could not load notifications');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

var $selectExclude = $("#exclude-pokemon");
var $selectNotify = $("#notify-pokemon");

var idToPokemon = {};

$.getJSON("static/locales/pokemon." + document.documentElement.lang + ".json").done(function(data) {
    var pokeList = []

    $.each(data, function(key, value) {
        pokeList.push( { id: key, text: value } );
        idToPokemon[key] = value;
    });

    // setup the filter lists
    $selectExclude.select2({
        placeholder: "Select Pokémon",
        data: pokeList
    });
    $selectNotify.select2({
        placeholder: "Select Pokémon",
        data: pokeList
    });

    // recall saved lists
    if (localStorage['remember_select_exclude']) {
        $selectExclude.val(JSON.parse(localStorage.remember_select_exclude)).trigger("change");
    }
    if (localStorage['remember_select_notify']) {
        $selectNotify.val(JSON.parse(localStorage.remember_select_notify)).trigger("change");
    }
});

var excludedPokemon = [];
var notifiedPokemon = [];

$selectExclude.on("change", function (e) {
    excludedPokemon = $selectExclude.val().map(Number);
    clearStaleMarkers();
    localStorage.remember_select_exclude = JSON.stringify(excludedPokemon);
});

$selectNotify.on("change", function (e) {
    notifiedPokemon = $selectNotify.val().map(Number);
    localStorage.remember_select_notify = JSON.stringify(notifiedPokemon);
});

var map;

var pGoStyle = [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#50b573"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#50b573"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#44696c"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#44696c"
            },
            {
                "visibility": "off"
            },
            {
                "weight": 4.1
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a7f3ad"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#73c890"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#44696c"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#58b368"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0e1b7"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#83ce90"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a4f4bf"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#a8e2bc"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#619975"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "2.08"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#9cd6ec"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#44696c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#7dc68d"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "-7"
            },
            {
                "color": "#82bdd3"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#82bdd3"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#44696c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#00acfc"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#579c44"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];
var neutralBlueStyle=[{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#3e606f"},{"weight":2},{"gamma":0.84}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]}];

var defaultStyle = 'style_neutral_blue';

function initMap()
{
  navigator.geolocation.getCurrentPosition(function(position)
  {
    center_lat = position.coords.latitude;
    center_lng = position.coords.longitude;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: center_lat,
            lng: center_lng
        },
        zoom: 16,
        fullscreenControl: true,
        streetViewControl: false,
    		mapTypeControl: true,
    		mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.RIGHT_TOP,
              mapTypeIds: [
                  google.maps.MapTypeId.ROADMAP,
                  google.maps.MapTypeId.SATELLITE,
                  'style_pgo',
                  'style_neutral_blue'
             ]
            },
        });

  	var style_pgo = new google.maps.StyledMapType(pGoStyle, {name: "PokemonGo Day"});
  	map.mapTypes.set('style_pgo', style_pgo);

  	var style_neutral_blue = new google.maps.StyledMapType(neutralBlueStyle, {name: "PokemonGo Night"});
  	map.mapTypes.set('style_neutral_blue', style_neutral_blue);

    map.addListener('maptypeid_changed', function(s) {
        localStorage['map_style'] = this.mapTypeId;
    });

    if (!localStorage['map_style'] || localStorage['map_style'] === 'undefined') {
        localStorage['map_style'] = defaultStyle;
    }

    map.setMapTypeId(localStorage['map_style']);

    marker = new google.maps.Marker({
        position: {
            lat: center_lat,
            lng: center_lng
        },
        map: map,
        animation: google.maps.Animation.DROP
    });

    // Get data for current location
    $.post("next_loc", {
        lat: center_lat,
        lon: center_lng
    }).done(function (data) {
        window.setInterval(updateMap, 5000);
        updateMap();
        initSidebar();
    });

    }, function() { console.log("fail"); });
}

function initSidebar() {
    $('#gyms-switch').prop('checked', localStorage.showGyms === 'true');
    $('#pokemon-switch').prop('checked', localStorage.showPokemon === 'true');
    $('#pokestops-switch').prop('checked', localStorage.showPokestops === 'true');
    $('#scanned-switch').prop('checked', localStorage.showScanned === 'true');
    $('#sound-switch').prop('checked', localStorage.playSound === 'true');

    var searchBox = new google.maps.places.SearchBox(document.getElementById('next-location'));

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        var loc = places[0].geometry.location;
        $.post("next_loc?lat=" + loc.lat() + "&lon=" + loc.lng(), {}).done(function (data) {
            $("#next-location").val("");
            map.setCenter(loc);
            marker.setPosition(loc);
        });
    });
}

var pad = function (number) { return number <= 99 ? ("0" + number).slice(-2) : number; }


function pokemonLabel(name, disappear_time, id, latitude, longitude) {
    disappear_date = new Date(disappear_time)

    var contentstring = `
        <div>
            <b>${name}</b>
            <span> - </span>
            <small>
                <a href='http://www.pokemon.com/us/pokedex/${id}' target='_blank' title='View in Pokedex'>#${id}</a>
            </small>
        </div>
        <div>
            Disappears at ${pad(disappear_date.getHours())}:${pad(disappear_date.getMinutes())}:${pad(disappear_date.getSeconds())}
            <span class='label-countdown' disappears-at='${disappear_time}'>(00m00s)</span></div>
        <div>
            <a href='https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}'
                    target='_blank' title='View in Maps'>Get directions</a>
        </div>`;
    return contentstring;
}

function gymLabel(team_name, team_id, gym_points) {
    var gym_color = ["0, 0, 0, .4", "74, 138, 202, .6", "240, 68, 58, .6", "254, 217, 40, .6"];
    var str;
    if (team_id == 0) {
        str = `<div><center>
            <div>
                <b style='color:rgba(${gym_color[team_id]})'>${team_name}</b><br>
                <img height='70px' style='padding: 5px;' src='static/forts/${team_name}_large.png'>
            </div>
            </center></div>`;
    } else {
        str = `
            <div><center>
            <div style='padding-bottom: 2px'>Gym owned by:</div>
            <div>
                <b style='color:rgba(${gym_color[team_id]})'>Team ${team_name}</b><br>
                <img height='70px' style='padding: 5px;' src='static/forts/${team_name}_large.png'>
            </div>
            <div>Prestige: ${gym_points}</div>
            </center></div>`;
    }

    return str;
}

function pokestopLabel(lured, last_modified, active_pokemon_id, latitude, longitude) {
    var str;
    if (lured) {
        var active_pokemon = idToPokemon[active_pokemon_id];

        var last_modified_date = new Date(last_modified);
        var current_date = new Date();

        var time_until_expire = current_date.getTime() - last_modified_date.getTime();

        var expire_date = new Date(current_date.getTime() + time_until_expire);
        var expire_time = expire_date.getTime();

        str = `
            <div>
                <b>Lured Pokéstop</b>
            </div>
            <div>
                Lured Pokémon: ${active_pokemon}
                <span> - </span>
                <small>
                    <a href='http://www.pokemon.com/us/pokedex/${active_pokemon_id}' target='_blank' title='View in Pokedex'>#${active_pokemon_id}</a>
                </small>
            </div>
            <div>
                Lure expires at ${pad(expire_date.getHours())}:${pad(expire_date.getMinutes())}:${pad(expire_date.getSeconds())}
                <span class='label-countdown' disappears-at='${expire_time}'>(00m00s)</span></div>
            <div>
            <div>
                <a href='https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}'
                        target='_blank' title='View in Maps'>Get directions</a>
            </div>`;
    } else {
        str = `
            <div>
                <b>Pokéstop</b>
            </div>
            <div>
                <a href='https://www.google.com/maps/dir/Current+Location/${latitude},${longitude}'
                        target='_blank' title='View in Maps'>Get directions</a>
            </div>`;
    }

    return str;
}

function scannedLabel(last_modified) {
    scanned_date = new Date(last_modified)
    var pad = function (number) { return number <= 99 ? ("0" + number).slice(-2) : number; }

    var contentstring = `
        <div>
            Scanned at ${pad(scanned_date.getHours())}:${pad(scanned_date.getMinutes())}:${pad(scanned_date.getSeconds())}
        </div>`;
    return contentstring;
};

// Dicts
map_pokemons = {} // Pokemon
map_gyms = {} // Gyms
map_pokestops = {} // Pokestops
map_scanned = {} // Pokestops
var gym_types = ["Uncontested", "Mystic", "Valor", "Instinct"];
var audio = new Audio('https://github.com/AHAAAAAAA/PokemonGo-Map/raw/develop/static/sounds/ding.mp3');

function setupPokemonMarker(item) {
    var marker = new google.maps.Marker({
        position: {
            lat: item.latitude,
            lng: item.longitude
        },
        map: map,
        icon: 'static/icons/' + item.pokemon_id + '.png'
    });

    marker.infoWindow = new google.maps.InfoWindow({
        content: pokemonLabel(item.pokemon_name, item.disappear_time, item.pokemon_id, item.latitude, item.longitude)
    });

    if (notifiedPokemon.indexOf(item.pokemon_id) > -1) {
        if(localStorage.playSound === 'true'){
          audio.play();
        }
        sendNotification('A wild ' + item.pokemon_name + ' appeared!', 'Click to load map', 'static/icons/' + item.pokemon_id + '.png')
    }

    addListeners(marker);
    return marker;
};

function setupGymMarker(item) {
    var marker = new google.maps.Marker({
        position: {
            lat: item.latitude,
            lng: item.longitude
        },
        map: map,
        icon: 'static/forts/' + gym_types[item.team_id] + '.png'
    });

    marker.infoWindow = new google.maps.InfoWindow({
        content: gymLabel(gym_types[item.team_id], item.team_id, item.gym_points)
    });

    addListeners(marker);
    return marker;
};

function setupPokestopMarker(item) {
    var imagename = item.lure_expiration ? "PstopLured" : "Pstop";
    var marker = new google.maps.Marker({
        position: {
            lat: item.latitude,
            lng: item.longitude
        },
        map: map,
        icon: 'static/forts/' + imagename + '.png',
    });

    marker.infoWindow = new google.maps.InfoWindow({
        content: pokestopLabel(!!item.lure_expiration, item.last_modified, item.active_pokemon_id, item.latitude, item.longitude)
    });

    addListeners(marker);
    return marker;
};

function getColorByDate(value){
    //Changes the Color from Red to green over 15 mins
    var diff = (Date.now() - value) / 1000 / 60 / 15;

    if(diff > 1){
        diff = 1;
    }

    //value from 0 to 1 - Green to Red
    var hue=((1-diff)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

function setupScannedMarker(item) {
    var circleCenter = new google.maps.LatLng(item.latitude, item.longitude);

    var marker = new google.maps.Circle({
        map: map,
        center: circleCenter,
        radius: 100,    // 10 miles in metres
        fillColor: getColorByDate(item.last_modified),
        strokeWeight: 1
    });

    // marker.infoWindow = new google.maps.InfoWindow({
    //     content: scannedLabel(item.last_modified),
    //     position: circleCenter
    // });

    //addListeners(marker);
    return marker;
};

function addListeners(marker) {
    marker.addListener('click', function() {
        marker.infoWindow.open(map, marker);
        updateLabelDiffTime();
        marker.persist = true;
    });

    google.maps.event.addListener(marker.infoWindow, 'closeclick', function() {
        marker.persist = null;
    });

    marker.addListener('mouseover', function() {
        marker.infoWindow.open(map, marker);
        updateLabelDiffTime();
    });

    marker.addListener('mouseout', function() {
        if (!marker.persist) {
            marker.infoWindow.close();
        }
    });
    return marker
};

function clearStaleMarkers() {
    $.each(map_pokemons, function(key, value) {

        if (map_pokemons[key]['disappear_time'] < new Date().getTime() ||
                excludedPokemon.indexOf(map_pokemons[key]['pokemon_id']) >= 0) {
            map_pokemons[key].marker.setMap(null);
            delete map_pokemons[key];
        }
    });

    $.each(map_scanned, function(key, value) {
        //If older than 15mins remove
        if (map_scanned[key]['last_modified'] < (new Date().getTime() - 15 * 60 * 1000)) {
            map_scanned[key].marker.setMap(null);
            delete map_scanned[key];
        }
    });
};

function updateMap() {

    localStorage.showPokemon = localStorage.showPokemon || true;
    localStorage.showGyms = localStorage.showGyms || true;
    localStorage.showPokestops = localStorage.showPokestops || false;
    localStorage.showScanned = localStorage.showScanned || false;

    $.ajax({
        url: "raw_data",
        type: 'GET',
        data: {
            'pokemon': localStorage.showPokemon,
            'pokestops': localStorage.showPokestops,
            'gyms': localStorage.showGyms,
            'scanned': localStorage.showScanned
        },
        dataType: "json"
    }).done(function(result) {
      $.each(result.pokemons, function(i, item){
          if (!localStorage.showPokemon) {
              return false; // in case the checkbox was unchecked in the meantime.
          }
          if (!(item.encounter_id in map_pokemons) &&
                    excludedPokemon.indexOf(item.pokemon_id) < 0) {
              // add marker to map and item to dict
              if (item.marker) item.marker.setMap(null);
              item.marker = setupPokemonMarker(item);
              map_pokemons[item.encounter_id] = item;
          }
        });

        $.each(result.pokestops, function(i, item) {
            if (!localStorage.showPokestops) {
                return false;
            } else if (!(item.pokestop_id in map_pokestops)) { // add marker to map and item to dict
                // add marker to map and item to dict
                if (item.marker) item.marker.setMap(null);
                item.marker = setupPokestopMarker(item);
                map_pokestops[item.pokestop_id] = item;
            }

        });

        $.each(result.gyms, function(i, item){
            if (!localStorage.showGyms) {
                return false; // in case the checkbox was unchecked in the meantime.
            }

            if (item.gym_id in map_gyms) {
                // if team has changed, create new marker (new icon)
                if (map_gyms[item.gym_id].team_id != item.team_id) {
                    map_gyms[item.gym_id].marker.setMap(null);
                    map_gyms[item.gym_id].marker = setupGymMarker(item);
                } else { // if it hasn't changed generate new label only (in case prestige has changed)
                    map_gyms[item.gym_id].marker.infoWindow = new google.maps.InfoWindow({
                        content: gymLabel(gym_types[item.team_id], item.team_id, item.gym_points)
                    });
                }
            }
            else { // add marker to map and item to dict
                if (item.marker) item.marker.setMap(null);
                item.marker = setupGymMarker(item);
                map_gyms[item.gym_id] = item;
            }

        });

        $.each(result.scanned, function(i, item) {
            if (!localStorage.showScanned) {
                return false;
            }

            if (item.scanned_id in map_scanned) {
                map_scanned[item.scanned_id].marker.setOptions({fillColor: getColorByDate(item.last_modified)});
            }
            else { // add marker to map and item to dict
                if (item.marker) item.marker.setMap(null);
                item.marker = setupScannedMarker(item);
                map_scanned[item.scanned_id] = item;
            }

        });

        clearStaleMarkers();
    });
};

document.getElementById('gyms-switch').onclick = function() {
    localStorage["showGyms"] = this.checked;
    if (this.checked) {
        updateMap();
    } else {
        $.each(map_gyms, function(key, value) {
            map_gyms[key].marker.setMap(null);
        });
        map_gyms = {}
    }
};

$('#pokemon-switch').change(function() {
    localStorage["showPokemon"] = this.checked;
    if (this.checked) {
        updateMap();
    } else {
        $.each(map_pokemons, function(key, value) {
            map_pokemons[key].marker.setMap(null);
        });
        map_pokemons = {}
    }
});

$('#pokestops-switch').change(function() {
    localStorage["showPokestops"] = this.checked;
    if (this.checked) {
        updateMap();
    } else {
        $.each(map_pokestops, function(key, value) {
            map_pokestops[key].marker.setMap(null);
        });
        map_pokestops = {}
    }
});

$('#sound-switch').change(function() {
    localStorage["playSound"] = this.checked;
});

$('#scanned-switch').change(function() {
    localStorage["showScanned"] = this.checked;
    if (this.checked) {
        updateMap();
    } else {
        $.each(map_scanned, function(key, value) {
            map_scanned[key].marker.setMap(null);
        });
        map_scanned = {}
    }
});

var updateLabelDiffTime = function() {
    $('.label-countdown').each(function(index, element) {
        var disappearsAt = new Date(parseInt(element.getAttribute("disappears-at")));
        var now = new Date();

        var difference = Math.abs(disappearsAt - now);
        var hours = Math.floor(difference / 36e5);
        var minutes = Math.floor((difference - (hours * 36e5)) / 6e4);
        var seconds = Math.floor((difference - (hours * 36e5) - (minutes * 6e4)) / 1e3);

        if (disappearsAt < now) {
            timestring = "(expired)";
        } else {
            timestring = "(";
            if (hours > 0)
                timestring = hours + "h";

            timestring += ("0" + minutes).slice(-2) + "m";
            timestring += ("0" + seconds).slice(-2) + "s";
            timestring += ")";
        }

        $(element).text(timestring)
    });
};

window.setInterval(updateLabelDiffTime, 1000);

function sendNotification(title, text, icon) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var notification = new Notification(title, {
            icon: icon,
            body: text,
            sound: 'sounds/ding.mp3'
        });

        notification.onclick = function () {
            window.open(window.location.href);
        };
    }
}
