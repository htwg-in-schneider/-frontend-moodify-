<template>

  <main class="privacy-page">

    <section class="privacy-card">

      <h1>Datenschutzerklärung</h1>

      <p class="hinweis">
        Moodify wurde im Rahmen eines Hochschulprojekts entwickelt.
      </p>


      <section>
        <h2>1. Verantwortliche</h2>
        <p>
          HTWG Hoschule für Wirtschaft, Technik und Gestaltung <br>
          Alfred-Wachtel-Str.8 <br>
          78462 Konstanz
        </p>
      </section>

      <section>
        <h2>2. Allgemeine Hinweise</h2>
        <p>
          Personenbezogene Daten werden ausschließlich im Rahmen der Nutzung der 
          Plattform verarbeitet und nicht an unbefugte Dritte weitergegeben. Wir nehmen 
          Ihren Datenschutz sehr ernst und behandeln Ihre personenbezogene Daten vertraulich 
          und entsprechend der gesetzlichen Vorschriften.
        </p>
      </section>

      <section>
        <h2>3. Rechtsgrundlage</h2>
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO. 
          Darüber hinaus erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section>
        <h2>4. Zweck der Verarbeitung</h2>
        <p>
          Die Daten werden genutzt, um die Funktionen der Anwendung bereitzustellen, wie die
          Benutzerverwaltung, Mood Tracking, Visionboards und personalisierte Challenge-Vorschläge.
        </p>
      </section>

    <div class="box">
       <h2>5. Verarbeitete Daten</h2>

       <p>
         Je nach Nutzung der Anwendung können folgende Daten gespeichert werden:
      </p>

       <h4>Stammdaten:</h4>
       <ul>
         <li>Name</li>
         <li>Benutzername</li>
         <li>E-Mail-Adresse</li>
         <li>Adresse (falls angegeben)</li>
       </ul>

      <h4>Anmeldedaten:</h4>
        <ul>
         <li>Informationen zur Anmeldung über Auth0</li>
         <li>Benutzerrolle</li>
       </ul>

      <h4>Anwendungsdaten:</h4>
        <ul>
         <li>MoodQuiz Ergebnisse</li>
         <li>Gespeicherte Stimmungen</li>
         <li>Challenges</li>
         <li>Visionboards</li>
       </ul>

      <h4>Technische Daten:</h4>
        <ul>
         <li>IP-Adresse</li>
         <li>Datum und Uhrzeit des Zugriffs</li>
       </ul>
    </div>
       

      <section>
        <h2>6. Speicherung und Löschung</h2>
        <p>
          Die Daten werden in einer Datenbank gespeichert und ausschließlich für die Funktionen der Anwendung verwendet. Eine Weitergabe an Dritte erfolgt nicht.
          Nutzer können die Berichtigung oder Löschung ihrer Daten anfragen.
        </p>
      </section>

      <section>
        <h2>7. Authetifizierung</h2>
        <p>
          Für die Anmeldung wird Auth0 verwendet. Dabei können Anmeldedaten und Identifikationsinformationen 
          durch Auth0 verarbeitet werden.Weitere Informationen finden Sie in der Datenschutzerklärung von Auth0.
        </p>
      </section>

      <section>
        <h2>8. Rechte der Nutzer</h2>
        <p>
          Nutzer können jederzeit Auskunft über ihre gespeicherten Daten verlangen sowie die Berichtigung 
          oder Löschung ihrer Daten beantragen.
        </p>
      </section>
    </section>
  </main>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;
  padding: 70px 24px;
  background: linear-gradient(180deg, #f9fafb, #eef2ff);
  color: #2f3a56;
}

.privacy-card {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 42px;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

h1 {
  font-size: 42px;
  margin-bottom: 16px;
  color: #2f3a56;
}

.hinweis {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 34px;
}

section {
  margin-bottom: 26px;
}

h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #2f3a56;
}

p {
  line-height: 1.7;
  color: #4b5563;
}

.box{
  color: #4b5563;
}

@media (max-width: 700px) {
  .privacy-card {
    padding: 28px;
  }

  h1 {
    font-size: 32px;
  }
}
</style>