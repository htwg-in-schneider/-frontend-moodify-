<template>
  <footer class="footer">
    <div class="footer-content">
      <h4>Moodify</h4>
      <p>Dein täglicher Boost fürs Wohlbefinden ✨</p>

      <div class="footer-links">
        <RouterLink to="/impressum">Impressum</RouterLink>
        <RouterLink to="/datenschutz">Datenschutz</RouterLink>
      </div>

      <p class="small">© {{ new Date().getFullYear() }} Moodify. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
   background: rgba(244, 206, 232, 0.75);
  color: white;
  text-align: center;
  padding: 60px 20px; /* kleiner statt clamp */
  margin-top: 20px;   /* weniger Abstand */
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
}

/* kleiner & cleaner */
.footer h4 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.footer p {
  opacity: 0.9;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.footer-links {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer-links a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  transition: 0.2s ease;
}

.footer-links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background: white;
  transition: 0.25s;
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-links a:hover {
  opacity: 0.85;
}

.small {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 18px;
}
</style>