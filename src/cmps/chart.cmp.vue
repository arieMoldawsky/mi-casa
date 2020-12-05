<script lang="ts">
import { Bar } from 'vue-chartjs'
 
export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Total Bookings',
          backgroundColor: 'rgb(255, 56, 92)',
          data: [5, 16, 12, 17, 1, 4, 5, 18, 10, 15, 12, 11]
        }
      ]
    })
  }
}
</script>

