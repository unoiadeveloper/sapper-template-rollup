<script>
  import { Input, Row, Col } from '../components/ui'
  import Map from '../components/Map.svelte'
  import Geocoder from '../components/Geocoder.svelte'
  import { getDistanceFromLatLonInKm, getNearest } from '../services/utils.js'

  let shippingMarker = null
  let destinationMarker = null
  let overviewPath

  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()

  const setMarker = (e, type) => {
    console.log(e, type)
    let place = e.detail
    let map = window.gmap

    if (type == 'shipping') setShippingMarker(map, place)

    if (type == 'destination') setDestinationMarker(map, place)

    if (shippingMarker && destinationMarker) {
      console.log(shippingMarker.position)
      calculateAndDisplayRoute(
        map,
        shippingMarker.title,
        destinationMarker.title
      )
    }
  }

  const setShippingMarker = (map, place) => {
    // Clear Old markers if any
    if (shippingMarker) shippingMarker.setMap(null)

    // Set Shipping Marker Value
    shippingMarker = new google.maps.Marker({
      position: place.geometry,
      title: place.label,
    })

    // Update Map with new Location
    map.setCenter(place.geometry)
    map.setZoom(12)

    // Place Marker on Map
    shippingMarker.setMap(map)
  }

  const setDestinationMarker = (map, place) => {
    // Clear Old markers if any
    if (destinationMarker) destinationMarker.setMap(null)

    // Set Shipping Marker Value
    destinationMarker = new google.maps.Marker({
      position: place.geometry,
      title: place.label,
    })

    // Update Map with new Location
    map.setCenter(place.geometry)
    map.setZoom(12)

    // Place Marker on Map
    destinationMarker.setMap(map)
  }

  const clearAllMarkers = () => {
    destinationMarker.setMap(null)
    shippingMarker.setMap(null)
  }

  const calculateAndDisplayRoute = (
    map,
    shippingAddress,
    destinationAddress
  ) => {
    directionsService.route(
      {
        origin: { query: shippingAddress },
        destination: { query: destinationAddress },
        travelMode: 'DRIVING',
      },
      function(response, status) {
        if (status === 'OK') {
          console.log(response)
          overviewPath = response.routes[0].overview_path
          directionsRenderer.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      }
    )
    directionsRenderer.setMap(map)
    clearAllMarkers()
  }

  const handleSubmit = () => {
    let map = window.gmap
    let sp = {
      lat: shippingMarker.position.lat(),
      lng: shippingMarker.position.lng(),
    }
    let dp = {
      lat: destinationMarker.position.lat(),
      lng: destinationMarker.position.lng(),
    }
    let totalDistance = getDistanceFromLatLonInKm(sp, dp)
    let centerPoint = getNearest(overviewPath, totalDistance / 3, sp)
    console.log(centerPoint)
    let nm = new google.maps.Marker({
      position: centerPoint,
      title: 'chl oye',
    })
    nm.setMap(map)
  }
</script>

<style>
  .formView {
    box-shadow: 7px 0 60px #8c8c8c;
    height: 90vh;
    z-index: 1;
    padding: 2rem 2rem 2rem 1rem;
    width: 100%;
  }
</style>

<svelte:head>
  <title>Map View</title>
</svelte:head>
<Row>
  <Col md="4">
    <Row>
      <div class="formView">
        <Row>
          <Col>
            <Input
              type="select"
              name="Favorite Route"
              placeholder="Select From Stored Routes"
              id="favRoute">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Input>
          </Col>
        </Row>

        <!--Grid row-->
        <Row>
          <Col>
            <Geocoder
              id="shippingLocation"
              name="Shipping Location"
              on:place-changed={e => setMarker(e, 'shipping')} />
          </Col>
        </Row>
        <!--Grid row-->

        <!--Grid row-->
        <Row>
          <Col>
            <Geocoder
              id="destinationLocation"
              name="Destination Location"
              on:place-changed={e => setMarker(e, 'destination')} />
          </Col>
        </Row>
        <!--Grid row-->

        <!--Grid row-->
        <Row>
          <Col>
            <Input
              type="select"
              name="Ship Date"
              placeholder="Select Shipping Date"
              id="shipDate">
              <option value="1">1/15/2020</option>
              <option value="2">1/16/2020</option>
              <option value="3">1/17/2020</option>
              <option value="3">1/18/2020</option>
            </Input>
          </Col>
        </Row>
        <!--Grid row-->

        <!--Grid row-->
        <Row>
          <Col>
            <Input
              type="select"
              name="Estimated Transit Time"
              placeholder="Select Days"
              id="transitTime">
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="6">6 Days</option>
              <option value="7">7 Days</option>
              <option value="8">8 Days</option>
            </Input>
          </Col>
        </Row>
        <!--Grid row-->
        <br />

        <button
          type="button"
          on:click={handleSubmit}
          class="btn btn-primary waves-effect btn-md">
          Submit
        </button>
        <button type="button" class="btn btn-indigo waves-effect btn-md">
          Save Route
        </button>
      </div>
    </Row>

  </Col>
  <Col md="8">
    <Row>
      <Map />
    </Row>

  </Col>

</Row>
