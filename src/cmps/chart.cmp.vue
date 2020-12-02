<script lang="ts">
import { Bar } from 'vue-chartjs'
 
export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Total Bookings',
          backgroundColor: 'rgb(255, 56, 92)',
          data: [5, 20, 12, 19, 1, 4, 5, 30, 10, 20, 12, 11]
        }
      ]
    })
  }
}
</script>

