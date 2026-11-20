import { supabase } from "./supabase-client.js";
import { formatDate, escapeHTML, setFooterYear } from "./utils.js";

setFooterYear();
const matchesEl = document.querySelector("#home-matches");
const championsEl = document.querySelector("#home-champions");

async function loadHome() {
  const [matches, champions] = await Promise.all([
    supabase.from("matches").select("id,tournament_name,team_a,team_b,match_date,status,score_a,score_b,venue").eq("is_published", true).order("match_date", { ascending: true }).limit(3),
    supabase.from("champions").select("id,tournament_name,champion_name,runner_up,result_date,description").eq("is_published", true).order("result_date", { ascending: false }).limit(3)
  ]);
  if (matches.error) matchesEl.innerHTML = `<p class="empty">Could not load matches. Check Supabase configuration.</p>`;
  else matchesEl.innerHTML = matches.data.length ? matches.data.map(m => `<article class="card"><span class="pill ${m.status === "live" ? "live" : ""}">${escapeHTML(m.status)}</span><h3>${escapeHTML(m.tournament_name)}</h3><div class="teams"><span>${escapeHTML(m.team_a)}</span><span class="versus">VS</span><span>${escapeHTML(m.team_b)}</span></div><p class="meta">${formatDate(m.match_date)} · ${escapeHTML(m.venue || "Venue TBA")}</p>${m.status === "completed" ? `<p><b>${m.score_a ?? 0} - ${m.score_b ?? 0}</b></p>` : ""}</article>`).join("") : `<p class="empty">No published matches yet.</p>`;
  if (champions.error) championsEl.innerHTML = `<p class="empty">Could not load champions.</p>`;
  else championsEl.innerHTML = champions.data.length ? champions.data.map(c => `<article class="card champion-card"><span class="pill">Champion</span><h3>${escapeHTML(c.tournament_name)}</h3><div class="champion-name">🏆 ${escapeHTML(c.champion_name)}</div><p class="meta">Runner-up: ${escapeHTML(c.runner_up || "—")} · ${escapeHTML(c.result_date || "")}</p></article>`).join("") : `<p class="empty">Champion results will appear here.</p>`;
}
loadHome().catch(console.error);
