import { supabase } from "./supabase-client.js";
import { formatDate, escapeHTML, setFooterYear } from "./utils.js";
setFooterYear();
const root = document.querySelector("#matches-list");
const { data, error } = await supabase.from("matches").select("*").eq("is_published", true).order("match_date", { ascending: true });
if (error) root.innerHTML = `<p class="empty">Unable to load fixtures. Please check your connection.</p>`;
else if (!data.length) root.innerHTML = `<p class="empty">No published matches yet.</p>`;
else root.innerHTML = data.map(m => `<article class="card"><span class="pill ${m.status === "live" ? "live" : ""}">${escapeHTML(m.status)}</span><h3>${escapeHTML(m.tournament_name)}</h3><div class="teams"><span>${escapeHTML(m.team_a)}</span><span class="versus">VS</span><span>${escapeHTML(m.team_b)}</span></div><p class="meta">${formatDate(m.match_date)} · ${escapeHTML(m.venue || "Venue TBA")}</p>${m.status === "completed" ? `<h3>${m.score_a ?? 0} - ${m.score_b ?? 0}</h3>` : ""}</article>`).join("");
