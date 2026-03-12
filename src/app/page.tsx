import { deployedByRepo } from '@/lib/deployments';

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  private: boolean;
  language: string | null;
  topics?: string[];
};

async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch('https://api.github.com/users/MOREXPO/repos?per_page=100&sort=updated', {
    next: { revalidate: 600 },
  });

  if (!res.ok) return [];
  const data = (await res.json()) as GitHubRepo[];
  return Array.isArray(data) ? data : [];
}

function statusBadge(isDeployed: boolean) {
  return isDeployed
    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40'
    : 'bg-zinc-500/15 text-zinc-300 border-zinc-400/40';
}

export default async function Home() {
  const repos = await getRepos();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-zinc-400 text-sm">IAMOEX · Infraestructura</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects Dashboard</h1>
          <p className="text-zinc-400 max-w-3xl">
            Visualiza todos los repos públicos de GitHub y cuáles están desplegados con dominio + túnel Cloudflare.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-4">
          {repos.map((repo) => {
            const deployed = deployedByRepo[repo.name];
            const isDeployed = Boolean(deployed);
            return (
              <article key={repo.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur p-5 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{repo.name}</h2>
                    <p className="text-sm text-zinc-400 mt-1">{repo.description || 'Sin descripción.'}</p>
                  </div>
                  <span className={`text-xs border rounded-full px-2.5 py-1 ${statusBadge(isDeployed)}`}>
                    {isDeployed ? 'DESPLEGADO' : 'SOLO GITHUB'}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <span className="text-zinc-400">GitHub:</span>{' '}
                    <a className="text-blue-300 underline" href={repo.html_url} target="_blank">
                      {repo.html_url}
                    </a>
                  </p>
                  <p className="text-zinc-400">Actualizado: {new Date(repo.updated_at).toLocaleString('es-ES')}</p>

                  {isDeployed ? (
                    <>
                      <p>
                        <span className="text-zinc-400">URL:</span>{' '}
                        <a className="text-cyan-300 underline" href={deployed.publicUrl} target="_blank">
                          {deployed.publicUrl}
                        </a>
                      </p>
                      <p>
                        <span className="text-zinc-400">Tunnel:</span> {deployed.tunnelName}
                      </p>
                      <p className="text-xs text-zinc-500 break-all">ID: {deployed.tunnelId}</p>
                    </>
                  ) : (
                    <p className="text-zinc-400">No desplegado actualmente en iamoex.com</p>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">{repo.language}</span>
                  )}
                  {(repo.topics || []).slice(0, 5).map((topic) => (
                    <span key={topic} className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
