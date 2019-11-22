<template>
  <div class="options">
    <p class="description">
      Each field will be set the default value if it is empty.
    </p>
    <label>
      Framerate:
      <input type="number" />
    </label>
    <label>
      Width:
      <input type="number" />
    </label>
    <label>
      Height:
      <input type="number" />
    </label>
  </div>
</template>

<script>
export default {
  name: "OptionSelect"
};
</script>

<style scoped lang="scss">
.options {
  margin: 0 0 2rem;

  .description {
    font-size: 0.75rem;
  }

  label {
    margin: 0 0.25rem;

    input {
      width: 2rem;
      padding: 0.25rem 0.5rem;
      border: solid 1px #ccc;
      border-radius: 8px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }
  }
}
</style>
