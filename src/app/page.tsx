import { projects } from '@/lib/projects';

function statusBadge(status: string) {
  if (status === 'online') return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40';
  if (status === 'offline') return 'bg-red-500/15 text-red-300 border-red-400/40';
  return 'bg-zinc-500/15 text-zinc-300 border-zinc-400/40';
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-zinc-400 text-sm">IAMOEX · Infraestructura</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects Dashboard</h1>
          <p className="text-zinc-400 max-w-3xl">Visualiza todos los proyectos desplegados con su repositorio de GitHub, URL pública y túnel Cloudflare asociado.</p>
        </header>

        <section className="grid md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article key={p.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur p-5 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="text-sm text-zinc-400 mt-1">{p.description}</p>
                </div>
                <span className={`text-xs border rounded-full px-2.5 py-1 ${statusBadge(p.status)}`}>{p.status.toUpperCase()}</span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-zinc-400">GitHub:</span> <a className="text-blue-300 underline" href={p.repoUrl} target="_blank">{p.repoUrl}</a></p>
                <p><span className="text-zinc-400">URL:</span> <a className="text-cyan-300 underline" href={p.publicUrl} target="_blank">{p.publicUrl}</a></p>
                <p><span className="text-zinc-400">Tunnel:</span> {p.tunnelName}</p>
                <p className="text-xs text-zinc-500 break-all">ID: {p.tunnelId}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">{s}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
