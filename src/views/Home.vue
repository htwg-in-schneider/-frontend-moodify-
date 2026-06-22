<script setup>
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import ReviewCard from '../components/ReviewCard.vue'
import { ref } from 'vue'
import { reviews as initialReviews } from '../data.js'

const reviews = ref(initialReviews)
const router = useRouter()

function goToLogin() {
  router.push('/login')
}

function openMail() {
  window.location.href = 'mailto:deine@mail.com'
}



const result = ref(null)
const spinning = ref(false)
const rotation = ref(0)

const challenges = [
  { emoji: '💗', text: 'Go for a 10 min walk' },
  { emoji: '☀️', text: 'Call someone you love' },
  { emoji: '🌤️', text: 'Write 3 gratitude points' },
  { emoji: '😇', text: 'Deep breathing 5 min' },
  { emoji: '🤩', text: 'Drink water & rest' },
  { emoji: '🌧️', text: 'Listen to calming music' }
]

function spinWheel() {
  if (spinning.value) return

  spinning.value = true
  result.value = null

  const index = Math.floor(Math.random() * challenges.length)
  const segmentAngle = 360 / challenges.length

  const fullSpins = 5 * 360
  const stopAngle = index * segmentAngle

  rotation.value = fullSpins + (360 - stopAngle)

  setTimeout(() => {
    result.value = challenges[index]
    spinning.value = false
  }, 4200)
}
</script>

<template>
  <main>

    <section class="hero-section">
  <div class="hero-container">

    <div class="hero-details">
      <h1 class="subtitle">
        Dein täglicher Boost<br />
        für dein Wohlbefinden
      </h1>

      <p class="description">
        Willkommen bei Moodify – entdecke neue Wege, deine Stimmung zu verbessern,
        dein Wohlbefinden zu stärken und deine persönlichen Ziele bewusster zu verfolgen.
      </p>

      <div class="buttons">
        <Button class="primary" variant="accent" @click="goToLogin">
          Start ✨
        </Button>

        <Button class="secondary" variant="secondary" @click="openMail">
          Contact Us ✉️
        </Button>
      </div>
    </div>


    <div class="hero-image">
      <div class="image-glass">
        <img src="../assets/image 122.png" alt="Moodify Hero" />
      </div>
    </div>

  </div>
</section>

    <section class="frame2-box" id="features">
      <h2 class="frame2-title">Finde heraus wie du dich fühlst</h2>

      <div class="display">
        <img src="../assets/image 119.png" alt="Gefühle teilen" class="frame2-image">

        <div class="frame2-box2">
          <h2 class="box2-title">Teile deine Gefühle</h2>

          <p class="frame2-description">
            Wie geht es dir heute? Teile uns genau das gerne mit, indem du ein paar kurze Fragen
            zu deinem Wohlbefinden beantwortest. Dadurch erfassen wir deine aktuelle Stimmung
            und erstellen anhand dessen einen Moodtracker.
          </p>

          <Button variant="accent" @click="goToLogin">
            Beginne den Chat✨
          </Button>
        </div>
      </div>
    </section>

    <section class="frame3-box">
      <div class="ohne-bild">
        <h2 class="frame3-title">Track it and have a reflection of it</h2>

        <p class="frame3-text">
          Basierend auf deinen Antworten erstellen wir deinen persönlichen Moodtracker.
          Erkenne dadurch Entwicklungen über Monate hinweg. Verfolge deine Emotionen
          und lerne dich selbst besser zu verstehen.
        </p>

        <Button variant="accent" @click="goToLogin">
          Tracke jetzt✨
        </Button>
      </div>

      <img
        src="../assets/image 64 (1).png"
        alt="Moodtracker auf dem Handy"
        class="frame3-image"
      >
    </section>

    <section class="frame4-box">
  <h2 class="frame4-title">Personalized Challenges</h2>

  <div class="box4">

    <div class="box4text">

      <h3 class="frame4-subtitle">
        Challenges based on your mood
      </h3>

      <p class="frame4-description">
        Dein MoodTracker analysiert deine Stimmung und erstellt automatisch
        passende Challenges, um dein Wohlbefinden nachhaltig zu verbessern.
      </p>

      <Button class="cta" variant="accent" @click="goToLogin">
        Get Your Challenge →
      </Button>
    </div>

 

    <div class="wheel-container">

  <div
    class="wheel"
    :style="{ transform: `rotate(${rotation}deg)` }"
    @click="spinWheel"
  >
    <div class="pointer"></div>

    <div class="center">
      <span v-if="!result">SPIN</span>
      <span v-else class="emoji">{{ result.emoji }}</span>
    </div>
  </div>

  <p class="label">
    {{ result ? result.text : 'Tap to spin your challenge' }}
  </p>

</div>


  </div>
</section>

  <section class="vision-section">
  <div class="vision-grid">

    <div class="vision-left">
      <div class="vision-image-wrap">

        <img src="../assets/visionboardh.png" class="vs" alt="Vision Frame">
      </div>
    </div>

    <div class="vision-text">
      <h2>Gestalte dein Visionboard in wenigen Sekunden</h2>

      <p>
        Erschaffe dein persönliches Visionboard direkt bei uns.
        Starte auf einer weißen Leinwand und fülle diese mit deinen Träumen
        und Zielen in Form von Bildern.
      </p>

      <Button variant="accent" @click="goToLogin">
        Erstelle jetzt ✨
      </Button>
    </div>

  </div>
</section>




    <section class="affirmation-section">

      <h2 class="affirmation-title">Deine täglichen Affirmations</h2>

      <div class="affirmation-content">
        <div class="affirmation-textbox">
          <p class="affirmation-text">
            Jeden Tag wartet hier eine neue, liebevoll ausgewählte Affirmation auf dich.
            Sie soll dich daran erinnern, wie wertvoll und einzigartig du bist.
          </p>

          <Button variant="accent" @click="goToLogin">
            Lese hier✨
          </Button>
        </div>

        <img
          src="../assets/takebreak.png" alt="Affirmation"  class="affirmation-image" >
      </div>
    </section>

    <section id="reviews" class="testimonials">
      <h2>What Our Members Think</h2>

      <div class="review-grid">
        <ReviewCard
          v-for="r in reviews"
          :key="r.id"
          :review="r"
        />
      </div>
    </section>

  </main>
</template>

<style scoped>

.hero-section {
  padding: 140px 24px;
  min-height: 90vh;   
  display: flex;
  align-items: center;
  background: radial-gradient(circle at top, #fdf2f8, #eef2ff 45%, #ffffff);
}
.hero-container {
  max-width: 1200px;

  margin: auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
}

.hero-details {
  animation: fadeUp 0.8s ease;
}

.subtitle {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -1px;
  color: #111827;
}

.description {
  margin-top: 18px;
  font-size: 16px;
  line-height: 1.7;
  color: #6b7280;
  max-width: 520px;
}

.buttons {
  margin-top: 28px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.primary {
  box-shadow: 0 14px 35px rgba(99,102,241,0.25);
}

.secondary {
  background: rgba(17,24,39,0.04);
}


.hero-image {
  display: flex;
  justify-content: center;
 
}



@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .subtitle {
    font-size: 36px;
  }

  .description {
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    justify-content: center;
  }
}
.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}


.vision-section {
  padding: 140px 24px;
  height: 700px;

  position: relative;
  overflow: hidden;

  
  background: linear-gradient(
    180deg,
    #444e97 0%,
    #eef2ff 60%,
    #f9fafb 100%
  );
}

.vision-grid {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  align-items: center;
  gap: 80px;
}


.vision-left {
  display: flex;
  justify-content: center;
  align-items: center;
}


.vision-image-wrap {
  width: 360px;
  height: 420px;



  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.3s ease;
}


.vs {
  width: 85%;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
}


.vision-text {
  max-width: 520px;
}

.vision-text h2 {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;

  color: #111827;
  letter-spacing: -0.8px;
  margin-bottom: 20px;
}

.vision-text p {
  font-size: 16px;
  line-height: 1.8;
  color: #6b7280;

  margin-bottom: 32px;
}


.vision-text button {
  box-shadow: 0 18px 45px rgba(99,102,241,0.25);
}


@media (max-width: 900px) {
  .vision-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 50px;
  }

  .vision-text h2 {
    font-size: 30px;
  }

  .vision-image-wrap {
    width: 300px;
    height: 360px;
  }
}


.affirmation-section {
  padding: 140px 24px;
  background: linear-gradient(180deg, #fff, #ffe4f1);
  position: relative;
  overflow: hidden;
  margin: 0; /* WICHTIG: entfernt gap */
}


.affirmation-section,
.vision-section {
  margin-bottom: 0;
}


.affirmation-content {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
}


.affirmation-textbox {
  max-width: 520px;
}

.affirmation-text {
  font-size: 16px;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 28px;
}


.affirmation-image {
  width: 100%;
  max-width: 360px;
  margin: auto;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
}


.affirmation-section::after {
  content: "";
  position: absolute;
  inset: 0;

  background: radial-gradient(
    circle at 70% 40%,
    rgba(244,114,182,0.18),
    transparent 60%
  );

  pointer-events: none;
}

.frame4-box {
  padding: 140px 24px;
  background: linear-gradient(180deg, #ffffff, #444e97);
  height: 700px;
}

.frame4-title {
  text-align: center;
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 70px;
  color: #111827;
  letter-spacing: -0.5px;
}

.box4 {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}


.box4text {
  padding: 10px;
}


.frame4-subtitle {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 14px;
  color: #111827;
}

.frame4-description {
  font-size: 15px;
  line-height: 1.8;
  color: #6b7280;
  margin-bottom: 28px;
}

.cta {
  box-shadow: 0 18px 45px rgba(99,102,241,0.25);
}
.wheel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.wheel {
  width: 260px;
  height: 260px;
  border-radius: 50%;

  background: conic-gradient(
    #6366f1 0deg 60deg,
    #8b5cf6 60deg 120deg,
    #ec4899 120deg 180deg,
    #6366f1 180deg 240deg,
    #8b5cf6 240deg 300deg,
    #ec4899 300deg 360deg
  );

  position: relative;
  cursor: pointer;

  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);

  box-shadow: 0 30px 80px rgba(0,0,0,0.15);
}


.pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);

  width: 0;
  height: 0;

  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 20px solid #111827;
}


.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 120px;
  height: 120px;
  border-radius: 50%;

  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(14px);

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  border: 1px solid rgba(0,0,0,0.08);
}


.label {
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  max-width: 220px;
}

.emoji {
  font-size: 26px;
}



.frame2-box {
  padding: 140px 24px;
  min-height: 700px;


  background: linear-gradient(
    180deg,
    #d8e183 100%,
    #f3f4ff 40%,
    #ffffff 0%,
  );

  position: relative;
  overflow: hidden;
}


</style>