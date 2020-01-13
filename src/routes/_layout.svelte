<script>
  import Nav from '../components/Nav.svelte'

  export let segment
</script>

<style>
  main {
    position: relative;

    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<div class="container-fluid">
  <slot />
</div>
