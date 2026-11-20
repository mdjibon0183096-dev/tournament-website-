import { supabase } from "./supabase-client.js";
import { escapeHTML, setFooterYear } from "./utils.js";
setFooterYear();
const root = document.querySelector("#champions-list");
const { data, error } = await supabase.from("champions").select("*").eq("is_published", true).order("result_date", { ascending: false });
if (error) root.innerHTML = `<p class="empty">Unable to load champions.</p>`;
else if (!data.length) root.innerHTML = `<p class="empty">No champion results published yet.</p>`;
else root.innerHTML = data.map(c => `<article class="card champion-card"><span class="pill">Champion</span><h3>${escapeHTML(c.tournament_name)}</h3><div class="champion-name">🏆 ${escapeHTML(c.champion_name)}</div><p class="meta">Runner-up: ${escapeHTML(c.runner_up || "—")} · ${escapeHTML(c.result_date || "Date TBA")}</p><p>${escapeHTML(c.description || "")}</p></article>`).join("");
