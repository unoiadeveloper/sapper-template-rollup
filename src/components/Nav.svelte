<script>
  export let segment
</script>

<style>
  nav {
    z-index: 9;
  }
</style>

<nav class="navbar navbar-expand-lg navbar-dark primary-color">

  <!-- Navbar brand -->
  <a class="navbar-brand" href=".">Awesome Sapper</a>

  <!-- Collapse button -->
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#basicExampleNav"
    aria-controls="basicExampleNav"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>

  <!-- Collapsible content -->
  <div class="collapse navbar-collapse" id="basicExampleNav">

    <!-- Links -->
    <ul class="navbar-nav mr-auto">
      <li class:active={segment === undefined} class="nav-item">
        <a class="nav-link waves-effect waves-light" href=".">
          Home
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class:active={segment === 'about'} class="nav-item">
        <a class="nav-link waves-effect waves-light" href="about">About</a>
      </li>
      <li class:active={segment === 'map'} class="nav-item">
        <a class="nav-link waves-effect waves-light" href="map">map</a>
      </li>
      <li class:active={segment === 'blog'} class="nav-item">
        <a rel="prefetch" class="nav-link waves-effect waves-light" href="blog">
          blog
        </a>
      </li>

    </ul>
    <!-- Links -->

    <form class="form-inline">
      <div class="md-form my-0">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          aria-label="Search" />
      </div>
    </form>
  </div>
  <!-- Collapsible content -->

</nav>
