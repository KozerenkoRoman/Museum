// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tYW5rb3plcmVua28iLCJhIjoiY2t1bDZ6a25yMTBuYzJwbzY1YXFjZnFueiJ9.sYmxahpL-RKugpESccQYWQ';
const map = new mapboxgl.Map({
    container: 'contacts-map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3364, 48.86091],
    zoom: 16
});
map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({color: 'black'})
    .setLngLat([2.3364, 48.86091])
    .addTo(map);
const marker2 = new mapboxgl.Marker({color: 'darkgray'})
    .setLngLat([2.3333, 48.8602])
    .addTo(map);
const marker3 = new mapboxgl.Marker({color: 'darkgray'})
    .setLngLat([2.3397, 48.8607])
    .addTo(map);
const marker4 = new mapboxgl.Marker({color: 'darkgray'})
    .setLngLat([2.3330, 48.8619])
    .addTo(map);
const marker5 = new mapboxgl.Marker({color: 'darkgray'})
    .setLngLat([2.3365, 48.8625])
    .addTo(map);

