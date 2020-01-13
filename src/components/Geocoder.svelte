<script>
  import autocomplete from './autocompleter.js'
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let input

  export let label = 'Search location'
  export let id = ''
  export let name = ''
  export let disabled = false
  export let value = null
  export let placeholder = 'Enter Location'
  export let styleClass = ''

  export let apiUrl = 'https://api.mapbox.com'
  export let endpoint = 'mapbox.places'
  export let accessToken =
    'pk.eyJ1IjoiZHBzZGhpbWFueiIsImEiOiJjamtubjdmNWQyZ2YyM3ZwamRteXY0Z3dhIn0.scrBbK-glmMz0OV4zlEx5w'
  export let debounceWaitMs = 1000
  export let minLength = 3

  function getSearchUrl() {
    return `${apiUrl}/geocoding/v5/${endpoint}/${value}.json?access_token=${accessToken}&autocomplete=true`
  }

  function parseSuggestions(payload) {
    return payload.features.map(p => {
      const [lng, lat] = p.center
      return {
        label: p.place_name,
        place: p.text,
        context: p.context ? p.context.map(c => c.text) : [p.text],
        geometry: {
          lat,
          lng,
        },
      }
    })
  }

  function getAutocompleteResults(text, update) {
    const url = getSearchUrl()
    fetch(url)
      .then(r => r.json())
      .then(results => {
        const suggestions = parseSuggestions(results)
        update(suggestions)
      })
  }

  export function clear() {
    value = null
    dispatch('clear')
  }

  function onSelect(item) {
    value = item.label
    dispatch('place-changed', item)
  }

  function renderItem(item, currentValue) {
    const itemElement = document.createElement('li')
    const { place, context } = item
    const output = [
      '<span class="location"><span class="font-weight-bold">',
      place,
      '</span> <span>',
      context.join(', '),
      '</span></location>',
    ].join('')
    itemElement.innerHTML = output
    return itemElement
  }

  onMount(async () => {
    autocomplete({
      input,
      fetch: getAutocompleteResults,
      onSelect,
      debounceWaitMs,
      minLength,
      render: renderItem,
      className: 'mdb-autocomplete-wrap',
    })
  })
</script>

<style>
  :global(.autocomplete li .location:hover) {
    /* this will apply to <body> */
    /* your styles go here */
    background-color: #4285f4 !important;
    color: #fff !important;
    border-radius: 0.125rem;
    -webkit-box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-transition: 0.15s;
    transition: 0.15s;
  }
  :global(.autocomplete li .location) {
    display: block;
    padding: 0.3rem;
    font-size: 0.9rem;
    color: #4285f4;
  }
  :global(.autocomplete li) {
    padding: 0.5rem !important;
  }
  :global(.autocomplete li:hover) {
    background-color: #fff !important;
  }
  :global(.autocomplete) {
    /* this will apply to <body> */
    /* your styles go here */
    min-width: 6.25rem !important;
    max-height: 40.625rem !important;
    margin: 0 !important;
    overflow-y: auto !important;
    background-color: #fff !important;
    max-width: 25rem !important;
  }
</style>

<!-- <input bind:this={input} bind:value {placeholder} aria-label={label} /> -->

<div class="md-form mb-0 md-outline colorful-select dropdown-primary">
  <input
    {id}
    class="form-control"
    type="text"
    on:blur
    on:focus
    on:keydown
    on:keypress
    on:keyup
    on:change
    on:input
    bind:this={input}
    bind:value
    {name}
    {disabled} />
  <label for={id}>{name}</label>
</div>
