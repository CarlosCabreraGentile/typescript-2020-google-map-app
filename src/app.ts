import axios from 'axios';

const form = document.querySelector('form')!;
const addressIput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = 'AIzaSyBTarkXTXSqu8TiInkelGddDEoKDRMkHMI';

type googleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const address = addressIput.value;

    //encodeURI encodes a text string as a valid Uniform Resource Identifier (URI)
    axios.get<googleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`
    )
        .then((response): any => {
            if (response.data.status !== 'OK') {
                throw new Error('Could Not Fetch Data');
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map")!, {
                center: coordinates,
                zoom: 8
            });

            // The marker positioned
            new google.maps.Marker({ position: coordinates, map: map });
        })
        .catch((error): any => {
            alert(error.message);
            console.log(error);
        });
}

//OPTION 2 Without a Credit Card
// declare var ol: any;

// function searchAddressHandler(event: Event) {
//   event.preventDefault();

//   const coordinates = {lat: 40.41, lng: -73.99}; // Can't fetch coordinates from Google API, use dummy ones

//   document.getElementById('map')!.innerHTML = ''; // clear <p> from <div id="map">
//   new ol.Map({
//     target: 'map',
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
//       zoom: 16
//     })
//   });
// }

form.addEventListener('submit', searchAddressHandler);