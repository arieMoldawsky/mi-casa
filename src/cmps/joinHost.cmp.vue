<template>
  <section class="join-host main-layout">
    <div class="inner-container fill-parent flex a-start j-space-b center-grid">
      <div
        class="first-panel text-wrapper full-height flex column a-start j-space-b"
      >
        <h2>Join millions of hosts on MiCasa</h2>
        <p>
          No matter what kind of home or room you want to share, MiCasa makes it
          simple and secure to host travelers. You’re in full control of your
          availability, prices, house rules, and how you interact with guests.
        </p>
        <p>
          There’s no cost to sign up. MiCasa generally charges hosts a flat 3%
          per reservation, among the lowest fees in the industry.
        </p>
        <p>
          We have your back to keep you, your home, and your belongings safe. We
          cover every booking with $1M USD in property damage protection and
          another $1M USD in insurance against accidents.
        </p>
        <button class="first-panel-btn flex">Join now!</button>
      </div>
      <div class="second-panel full-height">
          <img src="@/assets/img-squre-001.jpg" />
          <img src="@/assets/img-rectangle-x-002.jpg" />
          <img src="@/assets/img-rectangle-y-003.jpg" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isWideWindow: Boolean,
  },
}
</script>
