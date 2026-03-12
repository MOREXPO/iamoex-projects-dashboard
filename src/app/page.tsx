import { execSync } from 'node:child_process';
import ReposDashboard from '@/components/repos-dashboard';

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

export default async function Home() {
  const repos = await getRepos();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-black text-zinc-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-zinc-400 text-sm">IAMOEX · Infraestructura</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Projects Dashboard</h1>
          <p className="text-zinc-400 max-w-3xl">
            Visualiza todos los repos de GitHub y filtra por despliegue, visibilidad, lenguaje o texto.
          </p>
        </header>

        <ReposDashboard repos={repos} />
      </div>
    </main>
  );
}
