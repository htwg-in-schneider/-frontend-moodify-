<template>
  <main class="impressum-page">

    <div class="impressum-card">

      <h1>Impressum</h1>

      <p class="hinweis">
        Moodify wurde im Rahmen eines Hochschulprojekts entwickelt.
      </p>

      <section>

        <p>
          HTWG Hochschule für Technik, Wirtschaft und Gestaltung <br>
          Alfred-Wachtel-Straße 8 <br>
          78462 Konstanz <br>
        </p>
      </section>

      <section>
        <h4>Projektinformation</h4>

        <p>
          Moodify wurde im Rahmen des Moduls Webtechnologien als Hochschulprojekt an 
          der Hochschule Konstanz Technik, Wirtschaft und Gestaltung (HTWG) entwickelt.
          Die Anwendung dient ausschließlich Lehr-, Lern- und Demonstrationszwecken
          und verfolgt keine kommerziellen Interessen.
        </p>

      </section>
    </div>
  </main>
</template>

<style scoped>
.impressum-page {
  min-height: 100vh;
  padding: 60px;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
}

.impressum-card {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
}

h1 {
  font-size: 42px;
  margin-bottom: 35px;
  color: #2f3a56;
}

section {
  margin-bottom: 30px;
}

h2 {
  font-size: 22px;
  color: #2f3a56;
  margin-bottom: 10px;
}

p {
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 10px;
}

strong {
  color: #111827;
}

.hinweis {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 34px;
}

@media (max-width: 768px) {
  .impressum-page {
    padding: 25px;
  }

  .impressum-card {
    padding: 25px;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>