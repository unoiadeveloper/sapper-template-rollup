<script>
  import clsx from 'clsx'
  import { clean } from './utils'
  import { onMount } from 'svelte'

  let className = ''
  export { className as class }
  export let type = 'text'
  export let value = ''
  export let valid = false
  export let invalid = false
  export let readonly = false
  export let id = ''
  export let name = ''
  export let placeholder = ''
  export let disabled = false

  // eslint-disable-next-line no-unused-vars
  const { type: _omitType, ...props } = clean($$props)

  let classes
  let tag

  $: {
    let formControlClass = 'form-control'

    const selectInput = type === 'select'
    const textareaInput = type === 'textarea'
    tag = selectInput || textareaInput ? type : 'input'

    classes = clsx(
      className,
      invalid && 'is-invalid',
      valid && 'is-valid',
      formControlClass
    )
  }

  onMount(async () => {
    if (type == 'select') window.$(`#${id}`).materialSelect()
  })
</script>

{#if type === 'text'}
  <div class="md-form mb-0 md-outline">
    <input
      {id}
      type="text"
      on:blur
      on:focus
      on:keydown
      on:keypress
      on:keyup
      on:change
      on:input
      bind:value
      {readonly}
      class={classes}
      {name}
      {disabled}
      {placeholder} />
    <label for={id}>{name}</label>
  </div>
{:else if type === 'password'}
  <input
    {...props}
    {id}
    type="password"
    on:blur
    on:focus
    on:keydown
    on:keypress
    on:keyup
    on:change
    on:input
    bind:value
    {readonly}
    class={classes}
    {name}
    {disabled}
    {placeholder} />
  <label for={id}>{name}</label>
{:else if type === 'select'}
  <!-- <select
      {...props}
      class="mdb-select md-form md-outline colorful-select dropdown-primary"
      {id}
      on:blur
      on:focus
      on:change
      on:input
      {name}
      {disabled}>
      <option value="" disabled selected>{placeholder}</option>
      <slot />
    </select>
    <label class="mdb-main-label">{name}</label> -->

  <select
    {...props}
    class="mdb-select md-form mb-0 md-outline colorful-select dropdown-primary"
    {id}
    on:blur
    on:focus
    on:change
    on:input
    {name}
    {disabled}>
    <option value="" disabled selected>{placeholder}</option>
    <slot />
  </select>
  <label>{name}</label>
{/if}
