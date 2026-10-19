const statusBox = document.getElementById("status");
const matchesBox = document.getElementById("matches");
const refreshButton = document.getElementById("refresh");

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function matchTime(value) {
  if (!value) return "Heure inconnue";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Heure inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris"
  }).format(date);
}

function renderMatches(matches) {
  matchesBox.innerHTML = matches.map(match => {
    const hasScore = match.homeGoals !== null && match.homeGoals !== undefined &&
      match.awayGoals !== null && match.awayGoals !== undefined;
    const middle = hasScore
      ? `<strong class="score">${esc(match.homeGoals)} - ${esc(match.awayGoals)}</strong>`
      : `<span class="vs">VS</span>`;
    return `<article class="match-card">
      <div class="competition">${esc(match.competition || "Football")}</div>
      <div class="teams">
        <div class="team">${esc(match.homeTeam || "Équipe domicile")}</div>
        <div class="middle">${middle}</div>
        <div class="team">${esc(match.awayTeam || "Équipe extérieure")}</div>
      </div>
      <div class="match-meta"><span>${esc(match.status || "Programmé")}</span><strong>${esc(matchTime(match.utcDate))}</strong></div>
    </article>`;
  }).join("");
}

async function loadMatches() {
  refreshButton.disabled = true;
  statusBox.hidden = false;
  statusBox.classList.remove("error");
  statusBox.textContent = "Chargement des matchs du jour…";
  matchesBox.innerHTML = "";

  try {
    const response = await fetch("/api/matches", {
      headers: { "Accept": "application/json" },
      cache: "no-store"
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Impossible de récupérer les matchs pour le moment.");
    }
    if (!Array.isArray(data.matches) || data.matches.length === 0) {
      statusBox.textContent = data.message || "Aucun match trouvé pour aujourd’hui. Réessaie un peu plus tard.";
      return;
    }

    renderMatches(data.matches);
    statusBox.hidden = true;
  } catch (error) {
    statusBox.classList.add("error");
    statusBox.textContent = error.message || "La connexion aux matchs a échoué. Vérifie la configuration de l’API sur Vercel.";
  } finally {
    refreshButton.disabled = false;
  }
}

refreshButton.addEventListener("click", loadMatches);
loadMatches();
