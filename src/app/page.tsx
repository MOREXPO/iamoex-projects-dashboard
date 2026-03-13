import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import ReposDashboard from '@/components/repos-dashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type GitHubRepo = {
  name: string;
  url: string;
  description: string | null;
  updatedAt: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'INTERNAL';
  primaryLanguage?: { name: string } | null;
};

async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const out = execSync(
      "gh repo list MOREXPO --limit 200 --json name,url,description,updatedAt,visibility,primaryLanguage",
      { encoding: 'utf8' }
    );
    const data = JSON.parse(out) as GitHubRepo[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function getLocalProjects() {
  const root = '/data/.openclaw/workspace';
  try {
    const entries = fs.readdirSync(root, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules')
      .map((e) => ({
        name: e.name,
        hasGit: fs.existsSync(path.join(root, e.name, '.git')),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [] as Array<{ name: string; hasGit: boolean }>;
  }
}

export default async function Home() {
  const repos = await getRepos();
  const localProjects = getLocalProjects();
  const refreshedAt = new Date().toLocaleString('es-ES');

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-zinc-400 text-sm">IAMOEX · Infraestructura</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects Dashboard</h1>
          <p className="text-zinc-400 max-w-3xl">
            Sincronización en tiempo real con GitHub + listado de proyectos locales del workspace.
          </p>
          <p className="text-xs text-zinc-500">Última sincronización: {refreshedAt}</p>
        </header>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
          <p className="text-sm text-zinc-300">Proyectos locales detectados: <b>{localProjects.length}</b></p>
          <div className="mt-2 flex flex-wrap gap-2">
            {localProjects.slice(0, 30).map((p) => (
              <span key={p.name} className="text-xs rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1">
                {p.name} {p.hasGit ? '• git' : '• carpeta'}
              </span>
            ))}
          </div>
        </section>

        <ReposDashboard repos={repos} />
      </div>
    </main>
  );
}
