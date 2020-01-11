<script>
  import clsx from "clsx";

  let className = "";
  export { className as class };
  //export let type = "text";
  export let value = "";
  export let valid = false;
  export let invalid = false;
  export let readonly;
  export let id = "";
  export let name = "";
  export let placeholder = "";
  export let disabled = false;

  let classes;
  let tag;

  $: {
    let formControlClass = "form-control";

    classes = clsx(
      className,
      invalid && "is-invalid",
      valid && "is-valid",
      formControlClass
    );
  }
</script>

<div class="md-form">
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
