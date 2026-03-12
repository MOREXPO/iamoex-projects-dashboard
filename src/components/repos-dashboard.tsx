'use client';

import { useMemo, useState } from 'react';
import { deployedByRepo } from '@/lib/deployments';

type GitHubRepo = {
  name: string;
  url: string;
  description: string | null;
  updatedAt: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'INTERNAL';
  primaryLanguage?: { name: string } | null;
};

function statusBadge(isDeployed: boolean) {
  return isDeployed
    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40'
    : 'bg-zinc-500/15 text-zinc-300 border-zinc-400/40';
}

export default function ReposDashboard({ repos }: { repos: GitHubRepo[] }) {
  const [q, setQ] = useState('');
  const [deployFilter, setDeployFilter] = useState<'ALL' | 'DEPLOYED' | 'GITHUB_ONLY'>('ALL');
  const [visibility, setVisibility] = useState<'ALL' | 'PUBLIC' | 'PRIVATE' | 'INTERNAL'>('ALL');
  const [language, setLanguage] = useState('ALL');

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.primaryLanguage?.name && set.add(r.primaryLanguage.name));
    return ['ALL', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [repos]);

  const filtered = useMemo(() => {
    return repos.filter((repo) => {
      const isDeployed = Boolean(deployedByRepo[repo.name]);
      const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

      if (q && !text.includes(q.toLowerCase())) return false;
      if (deployFilter === 'DEPLOYED' && !isDeployed) return false;
      if (deployFilter === 'GITHUB_ONLY' && isDeployed) return false;
      if (visibility !== 'ALL' && repo.visibility !== visibility) return false;
      if (language !== 'ALL' && (repo.primaryLanguage?.name || '') !== language) return false;

      return true;
    });
  }, [repos, q, deployFilter, visibility, language]);

  return (
    <>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 grid md:grid-cols-5 gap-2">
        <input
          className="bg-zinc-800 rounded px-3 py-2 text-sm md:col-span-2"
          placeholder="Buscar por nombre o descripción..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select className="bg-zinc-800 rounded px-3 py-2 text-sm" value={deployFilter} onChange={(e) => setDeployFilter(e.target.value as any)}>
          <option value="ALL">Todos</option>
          <option value="DEPLOYED">Desplegados</option>
          <option value="GITHUB_ONLY">Solo GitHub</option>
        </select>

        <select className="bg-zinc-800 rounded px-3 py-2 text-sm" value={visibility} onChange={(e) => setVisibility(e.target.value as any)}>
          <option value="ALL">Visibilidad: todas</option>
          <option value="PUBLIC">PUBLIC</option>
          <option value="PRIVATE">PRIVATE</option>
          <option value="INTERNAL">INTERNAL</option>
        </select>

        <select className="bg-zinc-800 rounded px-3 py-2 text-sm" value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((l) => (
            <option key={l} value={l}>{l === 'ALL' ? 'Lenguaje: todos' : l}</option>
          ))}
        </select>
      </section>

      <p className="text-sm text-zinc-400">Mostrando {filtered.length} de {repos.length} repositorios</p>

      <section className="grid md:grid-cols-2 gap-4">
        {filtered.map((repo) => {
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
                <p><span className="text-zinc-400">GitHub:</span> <a className="text-blue-300 underline" href={repo.url} target="_blank">{repo.url}</a></p>
                <p className="text-zinc-400">Actualizado: {new Date(repo.updatedAt).toLocaleString('es-ES')}</p>

                {isDeployed ? (
                  <>
                    <p><span className="text-zinc-400">URL:</span> <a className="text-cyan-300 underline" href={deployed.publicUrl} target="_blank">{deployed.publicUrl}</a></p>
                    <p><span className="text-zinc-400">Tunnel:</span> {deployed.tunnelName}</p>
                    <p className="text-xs text-zinc-500 break-all">ID: {deployed.tunnelId}</p>
                  </>
                ) : (
                  <p className="text-zinc-400">No desplegado actualmente en iamoex.com</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">{repo.visibility}</span>
                {repo.primaryLanguage?.name && (
                  <span className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">{repo.primaryLanguage.name}</span>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
