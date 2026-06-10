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
</script>

<template>
  <main>

    <section class="hero-section">
      <div class="section-content">
        <div class="hero-details">
          <h1 class="subtitle">Dein täglicher Boost <br>fürs Wohlbefinden</h1>

          <p class="description">
            Willkommen bei Moodify – entdecke neue Wege, deine Stimmung zu verbessern,
            dein Wohlbefinden zu stärken und deine persönlichen Ziele bewusster zu verfolgen.
          </p>

          <div class="buttons">
            <Button variant="accent" @click="goToLogin">Start✨</Button>
            <Button
  variant="secondary"
  @click="openMail"
>
  Contact Us✨
</Button>
          </div>
        </div>

        <div class="hero-image">
          <img src="../assets/image 122.png" alt="Moodify Hero" class="image">
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
      <h2 class="frame4-title">Find Out What You Can Do to Feel Better</h2>

      <div class="box4">
        <div class="box4text">
          <h3 class="frame4-subtitle">Challenges, die zu deiner Stimmung passen</h3>

          <p class="frame4-description">
            Basierend auf deinem Moodtracker erstellen wir dir täglich neue Challenges,
            die zu deiner aktuellen Stimmung passen. So kannst du gezielt an deinem Wohlbefinden arbeiten.
          </p>

          <Button variant="accent" @click="goToLogin">
            Mehr erfahren✨
          </Button>
        </div>

        <div class="wheel-container">
          <div class="wheel">
            <div class="center">Spin</div>
          </div>
        </div>
      </div>
    </section>

    <!-- VISION -->
    <section class="vision-section">
      <div class="vision-grid">

        <div class="vision-left">
          <img src="../assets/sonadam.png" class="vs" alt="Vision Frame">
      
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
.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

/* VISION FINAL */
.vision-section {
  background: #f6f4f8;
  padding: 100px 24px 0;
  overflow: hidden;
}

.vision-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  align-items: center;
  gap: 20px;
}

.vision-left {
  position: relative;
  width: 340px;
  height: 430px;
  margin-right: auto;
  left: -40px;
}

.vision-friends {
  position: absolute;
  bottom: 0;
  left: -20px;
  width: 260px;
  z-index: 3;
}

.vision-frame {
  position: absolute;
  top: 18px;
  left: 60px;
  width: 150px;
  z-index: 2;
}

.vision-board-inside {
  position: absolute;
  top: 28px;
  left: 73px;
  width: 123px;
  transform: rotate(-8deg);
  border-radius: 12px;
  z-index: 1;
}

.vision-text {
  text-align: center;
  max-width: 520px;
  margin: auto;
}

.vision-text h2 {
  font-size: 42px;
  line-height: 1.2;
  margin-bottom: 30px;
  color: #2f2f39;
}

.vision-text p {
  font-size: 15px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 40px;
}

.vision-right-img {
  width: 280px;
  margin-left: auto;
  display: block;
}

@media (max-width: 900px) {
  .vision-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .vision-left {
    left: 0;
    margin: auto;
  }

  .vision-right-img {
    margin: auto;
  }

  .vision-text h2 {
    font-size: 30px;
  }
}
</style>