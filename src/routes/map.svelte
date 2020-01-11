<script>
  import Input from "../components/Input.svelte";
  import Row from "../components/Row.svelte";
  import Col from "../components/Col.svelte";
</script>

<svelte:head>
  <title>Map View</title>
</svelte:head>

<h1>Google Map</h1>
<Row>
  <Col md="3">
    <Input name="Full Name" id="full_name" />
  </Col>
  <Col md="auto">
    <p>This Page is used for Rendering Google Map</p>
  </Col>
</Row>
