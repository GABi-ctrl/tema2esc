// URL-ul API-ului pentru Random Duck
// Documentatie: https://random-d.uk/api/v2/random returns {"url": "...", "message": "..."}
const API_URL = 'https://random-d.uk/api/v2/random';

// Selectăm elementele din DOM
const duckImg = document.getElementById('duck-img');
const generateBtn = document.getElementById('generate-btn');
const statusText = document.getElementById('status-text');
const sourceText = document.getElementById('source-text');

// Funcție asincronă pentru a prelua datele
async function getRandomDuck() {
    // 1. Log în consolă - start cerere
    console.log("--> Inițializare cerere către Random Duck API...");
    
    // UI Update - arătăm utilizatorului că se încarcă
    statusText.textContent = "Se încarcă...";
    statusText.style.color = "blue";
    generateBtn.disabled = true;
    generateBtn.textContent = "Așteaptă...";

    try {
        // 2. Fetch date (Async/Await)
        const response = await fetch(API_URL);

        // Verificăm dacă răspunsul este OK
        if (!response.ok) {
            throw new Error(`Eroare HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        // 3. Log succes
        console.log("Date primite cu succes:", data);

        // Actualizăm DOM-ul cu datele primite
        // API-ul returnează imaginea în cheia "url" [Conform sursei 135]
        duckImg.src = data.url;
        
        // Actualizăm lista de detalii
        statusText.textContent = "Succes (200 OK)";
        statusText.style.color = "green";
        sourceText.textContent = data.url; // Afișăm linkul ca detaliu tehnic

    } catch (error) {
        // 4. Gestionarea erorilor (Try/Catch)
        console.error("Eroare critică la preluarea datelor:", error);
        
        statusText.textContent = "Eroare!";
        statusText.style.color = "red";
        alert("Nu am putut aduce o rață. Verifică conexiunea sau consola.");
    } finally {
        // Se execută mereu la final
        generateBtn.disabled = false;
        generateBtn.textContent = "Încarcă o Rață Nouă";
        console.log("--> Proces finalizat.");
    }
}

// Ascultător de eveniment pentru buton
generateBtn.addEventListener('click', getRandomDuck);

// Încărcăm o rață automat la deschiderea paginii
document.addEventListener('DOMContentLoaded', getRandomDuck);