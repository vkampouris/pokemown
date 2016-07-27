var idToPokemon = {};

var excludedPokemon = [];
var notifiedPokemon = [];

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

document.addEventListener("DOMContentLoaded", function () {
    if (!Notification) {
        console.log('could not load notifications');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

$(function () {
    var $selectExclude = $("#exclude-pokemon");
    var $selectNotify = $("#notify-pokemon");
    var $labelCountdown = $('.label-countdown');

    console.log('ready');

    $selectExclude.on("change", function (e) {
        excludedPokemon = $selectExclude.val().map(Number);
        clearStaleMarkers(excludedPokemon);
        localStorage.remember_select_exclude = JSON.stringify(excludedPokemon);
    });

    $selectNotify.on("change", function (e) {
        notifiedPokemon = $selectNotify.val().map(Number);
        localStorage.remember_select_notify = JSON.stringify(notifiedPokemon);
    });

    $.getJSON("static/locales/pokemon." + document.documentElement.lang + ".json").done(function(data) {
        console.log('get pokemon');
        idToPokemon = data;

        var pokeList = $.map(idToPokemon, function (name, id) {
            return {
                id: id,
                text: name
            };
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
        if (localStorage.remember_select_exclude) {
            $selectExclude.val(JSON.parse(localStorage.remember_select_exclude)).trigger("change");
        }
        if (localStorage.remember_select_notify) {
            $selectNotify.val(JSON.parse(localStorage.remember_select_notify)).trigger("change");
        }
    });

    $('#pokemon-switch').change(function() {
        localStorage.showPokemon = this.checked;
        if (this.checked) {
            updateMap($labelCountdown);
        } else {
            $.each(map_pokemons, function(key, value) {
                map_pokemons[key].marker.setMap(null);
            });
            map_pokemons = {};
        }
    });

    $('#pokestops-switch').change(function() {
        localStorage.showPokestops = this.checked;
        if (this.checked) {
            updateMap($labelCountdown);
        } else {
            $.each(map_pokestops, function(key, value) {
                map_pokestops[key].marker.setMap(null);
            });
            map_pokestops = {};
        }
    });

    $('#sound-switch').change(function() {
        localStorage.playSound = this.checked;
    });

    $('#scanned-switch').change(function() {
        localStorage.showScanned = this.checked;
        if (this.checked) {
            updateMap($labelCountdown);
        } else {
            $.each(map_scanned, function(key, value) {
                map_scanned[key].marker.setMap(null);
            });
            map_scanned = {};
        }
    });

    $('gyms-switch').change(function() {
        localStorage.showGyms = this.checked;
        if (this.checked) {
            updateMap($labelCountdown);
        } else {
            $.each(map_gyms, function(key, value) {
                map_gyms[key].marker.setMap(null);
            });
            map_gyms = {};
        }
    });

    window.setInterval(function () {
        updateLabelDiffTime($labelCountdown);
    }, 1000);
});

function initMap() {
    console.log('initialize map');

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
        localStorage.map_style = this.mapTypeId;
    });

    if (!localStorage.map_style || localStorage.map_style === 'undefined') {
        localStorage.map_style = defaultStyle;
    }

    map.setMapTypeId(localStorage.map_style);

    navigator.geolocation.getCurrentPosition(function(position) {
        center_lat = position.coords.latitude;
        center_lng = position.coords.longitude;

        map.setCenter({
            lat: center_lat,
            lng: center_lng
        });

        marker = new google.maps.Marker({
            position: {
                lat: center_lat,
                lng: center_lng
            },
            map: map,
            animation: google.maps.Animation.DROP
        });

        // Get data for current location
       $.post("next_loc?lat=" + center_lat + "&lon=" + center_lng, {}).done(function (data) {
           console.log('get data');
           window.setInterval(function () {
               updateMap($('.label-countdown'));
           }, 5000);
           updateMap($('.label-countdown'));
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

        if (places.length === 0) {
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

function pokemonLabel(pokemon) {
    var disappear_date = moment(pokemon.disappear_time);

    return `
        <div>
            <b>${pokemon.pokemon_name}</b>
            <span> - </span>
            <small>
                <a href='http://www.pokemon.com/us/pokedex/${pokemon.pokemon_id}' target='_blank' title='View in Pokedex'>#${pokemon.pokemon_id}</a>
            </small>
        </div>
        <div>
            Disappears at ${disappear_date.format('HH:mm:ss')}
            <span class='label-countdown' disappears-at='${pokemon.disappear_time}'>${disappear_date.fromNow()}</span></div>
        <div>
            <a href='https://www.google.com/maps/dir/Current+Location/${pokemon.latitude},${pokemon.longitude}'
                    target='_blank' title='View in Maps'>Get directions</a>
        </div>`;
}

function gymLabel(team_name, team_id, gym_points) {
    var gym_color = ["0, 0, 0, .4", "74, 138, 202, .6", "240, 68, 58, .6", "254, 217, 40, .6"];

    if (team_id === 0) {
        return `<div><center>
            <div>
                <b style='color:rgba(${gym_color[team_id]})'>${team_name}</b><br>
                <img height='70px' style='padding: 5px;' src='static/forts/${team_name}_large.png'>
            </div>
            </center></div>`;
    } else {
        return `
            <div><center>
            <div style='padding-bottom: 2px'>Gym owned by:</div>
            <div>
                <b style='color:rgba(${gym_color[team_id]})'>Team ${team_name}</b><br>
                <img height='70px' style='padding: 5px;' src='static/forts/${team_name}_large.png'>
            </div>
            <div>Prestige: ${gym_points}</div>
            </center></div>`;
    }
}

function pokestopLabel(pokestop, idToPokemon) {
    if (!!pokestop.lure_expiration) {
        var active_pokemon = idToPokemon[pokestop.active_pokemon_id];

        var expires_at = moment().add(moment().diff(pokestop.last_modified));

        return `
            <div>
                <b>Lured Pokéstop</b>
            </div>
            <div>
                Lured Pokémon: ${active_pokemon}
                <span> - </span>
                <small>
                    <a href='http://www.pokemon.com/us/pokedex/${pokestop.active_pokemon_id}' target='_blank' title='View in Pokedex'>#${pokestop.active_pokemon_id}</a>
                </small>
            </div>
            <div>
                Lure expires at ${expires_at.format('HH:mm:ss')}
                <span class='label-countdown' disappears-at='${expires_at.valueOf()}'>${expires_at.fromNow()}</span></div>
            <div>
            <div>
                <a href='https://www.google.com/maps/dir/Current+Location/${pokestop.latitude},${pokestop.longitude}'
                        target='_blank' title='View in Maps'>Get directions</a>
            </div>`;
    } else {
        return `
            <div>
                <b>Pokéstop</b>
            </div>
            <div>
                <a href='https://www.google.com/maps/dir/Current+Location/${pokestop.latitude},${pokestop.longitude}'
                        target='_blank' title='View in Maps'>Get directions</a>
            </div>`;
    }
}

function scannedLabel(last_modified) {
    return [
        '<div>',
            'Scanned at ' + moment(last_modified).format('HH:mm:ss'),
        '</div>'
    ].join("\n");
}

// Dicts
var map_pokemons = {}; // Pokemon
var map_gyms = {}; // Gyms
var map_pokestops = {}; // Pokestops
var map_scanned = {}; // Pokestops
var gym_types = ["Uncontested", "Mystic", "Valor", "Instinct"];
var audio = new Audio('https://github.com/AHAAAAAAA/PokemonGo-Map/raw/develop/static/sounds/ding.mp3');

function setupPokemonMarker(pokemon, $labelCountdown) {
    var marker = new google.maps.Marker({
        position: {
            lat: pokemon.latitude,
            lng: pokemon.longitude
        },
        map: map,
        icon: 'static/icons/' + pokemon.pokemon_id + '.png'
    });

    marker.infoWindow = new google.maps.InfoWindow({
        content: pokemonLabel(pokemon)
    });

    if (notifiedPokemon.indexOf(pokemon.pokemon_id) > -1) {
        if(localStorage.playSound === 'true'){
          audio.play();
        }
        sendNotification('A wild ' + pokemon.pokemon_name + ' appeared!', 'Click to load map', 'static/icons/' + pokemon.pokemon_id + '.png');
    }

    addListeners(marker, $labelCountdown);
    return marker;
}

function setupGymMarker(item, $labelCountdown) {
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

    addListeners(marker, $labelCountdown);
    return marker;
}

function setupPokestopMarker(item, $labelCountdown) {
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
        content: pokestopLabel(item, idToPokemon)
    });

    addListeners(marker, $labelCountdown);
    return marker;
}

function getColorByDate(value){
    //Changes the Color from Red to green over 15 mins
    var diff = moment(value).diff(moment(), 'minutes');

    if(diff > 1){
        diff = 1;
    }

    //value from 0 to 1 - Green to Red
    var hue=((1-diff)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

function setupScannedMarker(item, $labelCountdown) {
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

    //addListeners(marker, $labelCountdown);
    return marker;
}

function addListeners(marker, $labelCountdown) {
    marker.addListener('click', function() {
        marker.infoWindow.open(map, marker);
        updateLabelDiffTime($labelCountdown);
        marker.persist = true;
    });

    google.maps.event.addListener(marker.infoWindow, 'closeclick', function() {
        marker.persist = null;
    });

    marker.addListener('mouseover', function() {
        marker.infoWindow.open(map, marker);
        updateLabelDiffTime($labelCountdown);
    });

    marker.addListener('mouseout', function() {
        if (!marker.persist) {
            marker.infoWindow.close();
        }
    });
    return marker;
}

function clearStaleMarkers(excludedPokemon) {
    var now = moment();
    var fifteenMinutesBefore = moment().subtract(15, 'minutes');

    $.each(map_pokemons, function(key, value) {
        if (moment(map_pokemons[key].disappear_time).isBefore(now) ||
                excludedPokemon.indexOf(map_pokemons[key].pokemon_id) >= 0) {
            map_pokemons[key].marker.setMap(null);
            delete map_pokemons[key];
        }
    });

    $.each(map_scanned, function(key, value) {
        //If older than 15mins remove
        if (moment(map_scanned[key].last_modified).isBefore(fifteenMinutesBefore)) {
            map_scanned[key].marker.setMap(null);
            delete map_scanned[key];
        }
    });
}

function updateMap($labelCountdown) {
    console.log('update map');
    localStorage.showPokemon = localStorage.showPokemon || true;
    localStorage.showGyms = localStorage.showGyms || true;
    localStorage.showPokestops = localStorage.showPokestops || false;
    localStorage.showScanned = localStorage.showScanned || false;

    getRawData($labelCountdown, {
        'pokemon': localStorage.showPokemon,
        'pokestops': localStorage.showPokestops,
        'gyms': localStorage.showGyms,
        'scanned': localStorage.showScanned
    });
}

function getRawData($labelCountdown, settings) {
    $.ajax({
        url: "raw_data",
        type: 'GET',
        data: settings,
        dataType: "json"
    }).done(function(result) {
        if (settings.pokemon) {
            displayPokemonMarkers(result.pokemons, $labelCountdown);
        }

        if (settings.pokestops) {
            displayPokestopMarkers(result.pokestops, $labelCountdown);
        }

        if (settings.gyms) {
            displayGymMarkers(result.gyms, $labelCountdown);
        }

        if (settings.scanned) {
            displayScannedMarkers(result.scanned, $labelCountdown);
        }

        clearStaleMarkers(excludedPokemon);
    });
}

function displayPokemonMarkers(pokemons, $labelCountdown) {
    $.each(pokemons, function(i, pokemon){
        if (!(pokemon.encounter_id in map_pokemons) && excludedPokemon.indexOf(pokemon.pokemon_id) < 0) {
            // add marker to map and pokemon to dict
            if (pokemon.marker) pokemon.marker.setMap(null);
            pokemon.marker = setupPokemonMarker(pokemon, $labelCountdown);
            map_pokemons[pokemon.encounter_id] = pokemon;
        }
    });
}

function displayPokestopMarkers(pokestops, $labelCountdown) {
    $.each(pokestops, function(i, pokestop) {
        if (!(pokestop.pokestop_id in map_pokestops)) { // add marker to map and pokestop to dict
            // add marker to map and pokestop to dict
            if (pokestop.marker) pokestop.marker.setMap(null);
            pokestop.marker = setupPokestopMarker(pokestop, $labelCountdown);
            map_pokestops[pokestop.pokestop_id] = pokestop;
        }
    });
}

function displayGymMarkers(gyms, $labelCountdown) {
    $.each(gyms, function(i, gym){
        if (gym.gym_id in map_gyms) {
            // if team has changed, create new marker (new icon)
            if (map_gyms[gym.gym_id].team_id != gym.team_id) {
                map_gyms[gym.gym_id].marker.setMap(null);
                map_gyms[gym.gym_id].marker = setupGymMarker(gym, $labelCountdown);
            } else { // if it hasn't changed generate new label only (in case prestige has changed)
                map_gyms[gym.gym_id].marker.infoWindow = new google.maps.InfoWindow({
                    content: gymLabel(gym_types[gym.team_id], gym.team_id, gym.gym_points)
                });
            }
        }
        else { // add marker to map and gym to dict
            if (gym.marker) gym.marker.setMap(null);
            gym.marker = setupGymMarker(gym, $labelCountdown);
            map_gyms[gym.gym_id] = gym;
        }
    });
}

function displayScannedMarkers(scanned, $labelCountdown) {
    $.each(scanned, function(i, item) {
        if (item.scanned_id in map_scanned) {
            map_scanned[item.scanned_id].marker.setOptions({
                fillColor: getColorByDate(item.last_modified)
            });
        }
        else { // add marker to map and item to dict
            if (item.marker) item.marker.setMap(null);
            item.marker = setupScannedMarker(item, $labelCountdown);
            map_scanned[item.scanned_id] = item;
        }
    });
}

function updateLabelDiffTime($labelCountdown) {
    $labelCountdown.text(function(index, text) {
        var disappears = moment(parseInt(this.getAttribute("disappears-at")));
        console.log(disappears);

        if (disappears.isBefore()) {
            return "(expired)";
        } else {
            var difference = Math.abs(disappearsAt - now);
            var hours = Math.floor(difference / 36e5);
            var minutes = Math.floor((difference - (hours * 36e5)) / 6e4);
            var seconds = Math.floor((difference - (hours * 36e5) - (minutes * 6e4)) / 1e3);
            var timestring = "(";

            if (hours > 0) {
                timestring = hours + "h";
            }

            timestring += ("0" + minutes).slice(-2) + "m";
            timestring += ("0" + seconds).slice(-2) + "s";
            timestring += ")";

            return timestring;
        }
    });
}

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
