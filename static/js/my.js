$(document).ready();
window.initMap = function ready() {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}
window.onload = function () {
}
