<template>
  <div>
    <h1>Reason for visit:</h1>
    <div class="reception-div">
      <input class="reception-submit" type="button" value="Private" v-on:click="addAppointment" />
      <input
        class="reception-submit"
        type="button"
        value="Business"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
      <input
        class="reception-submit"
        type="button"
        value="Transactions"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
      <input
        class="reception-submit"
        type="button"
        value="Investment"
        onClick="alert('Appointment sucessfully booked.'); return true"
      />
    </div>
    <div id="example-1">
      <li
        v-for="item in items"
        v-bind:key="item.message"
      >{{ item.message }}</li>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ] }
  },
  methods: {
    addAppointment: function () {
      this.items.push({ 'message': 'zzzz' })
    }
  }
}
</script>
