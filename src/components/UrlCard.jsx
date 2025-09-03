import { useEffect, useMemo, useState } from "react";

function getHost(url) {
  try { return new URL(url).host.replace(/^www\./, ""); } catch { return ""; }
}

function getFavicon(url) {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${u.host}&sz=64`;
  } catch { return ""; }
}

function parseGitHubRepo(url) {
  try {
    const u = new URL(url);
    if (u.host !== "github.com") return null;
    const [owner, repo] = u.pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) return null;
    return { owner, repo };
  } catch { return null; }
}

export default function UrlCard({ demo, repo, thumb }) {
  const [gh, setGh] = useState(null);

  const primary = demo || repo || "";
  const host = useMemo(() => getHost(primary), [primary]);
  const favicon = useMemo(() => getFavicon(primary), [primary]);
  const ghInfo = useMemo(() => (repo ? parseGitHubRepo(repo) : null), [repo]);

  useEffect(() => {
    let ignore = false;
    async function fetchRepo() {
      if (!ghInfo) return;
      try {
        const res = await fetch(`https://api.github.com/repos/${ghInfo.owner}/${ghInfo.repo}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore) {
          setGh({
            description: data.description,
            stars: data.stargazers_count,
            language: data.language,
          });
        }
      } catch {
        /* ignore network errors */
      }
    }
    fetchRepo();
    return () => { ignore = true; };
  }, [ghInfo]);

  return (
    <div className="linkcard">
      {thumb ? (
        <img className="linkcard-thumb" src={thumb} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className="linkcard-thumb placeholder" aria-hidden="true" />
      )}

      <div className="linkcard-meta">
        {favicon && <img className="linkcard-favicon" src={favicon} alt="" width={16} height={16} />}
        <span className="linkcard-host">{host || "—"}</span>
      </div>

      {gh && (
        <div className="linkcard-gh">
          <div className="tech-chips" style={{gap: '.4rem'}}>
            {gh.language && <span className="chip">{gh.language}</span>}
            <span className="chip" title="GitHub stars">★ {gh.stars ?? 0}</span>
          </div>
          {gh.description && <p className="muted small">{gh.description}</p>}
        </div>
      )}

      <div className="linkcard-actions">
        {demo && (
          <a className="btn" href={demo} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-arrow-up-right-from-square" /> Live
          </a>
        )}
        {repo && (
          <a className="btn ghost" href={repo} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github" /> Code
          </a>
        )}
      </div>
    </div>
  );
}
