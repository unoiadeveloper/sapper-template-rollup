<script>
  import { onMount } from 'svelte'
  export let map

  onMount(async () => {
    // mapboxgl.accessToken =
    //   'pk.eyJ1IjoiZHBzZGhpbWFueiIsImEiOiJjamtubjdmNWQyZ2YyM3ZwamRteXY0Z3dhIn0.scrBbK-glmMz0OV4zlEx5w'
    // var map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-74.5, 40], // starting position
    //   zoom: 1, // starting zoom
    // })
    // map.addControl(new mapboxgl.NavigationControl())
    window.gmap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 4,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    })
    // console.log(map)
    // var marker = new google.maps.Marker({
    //   position: { lat: -34.397, lng: 150.644 },
    //   map: map,
    //   title: 'Hello World!',
    // })
  })
</script>

<style>
  #map {
    width: 100%;
    height: 90vh;
  }
</style>

<div id="map" />
