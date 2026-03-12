export type Project = {
  name: string;
  description: string;
  repoUrl: string;
  publicUrl: string;
  tunnelName: string;
  tunnelId: string;
  status: 'online' | 'offline' | 'unknown';
  stack: string[];
};

export const projects: Project[] = [
  {
    name: 'TaskFlow',
    description: 'Gestor de tareas con estados, calendario y control horario.',
    repoUrl: 'https://github.com/MOREXPO/taskflow',
    publicUrl: 'https://taskflow.iamoex.com',
    tunnelName: 'taskflow-stable',
    tunnelId: '76a1783c-f1e7-4a84-a01f-829967d39d51',
    status: 'online',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'SQLite'],
  },
  {
    name: 'InstaPilot Dashboard',
    description: 'Planificación social con IA y flujo publicar/despublicar.',
    repoUrl: 'https://github.com/MOREXPO/insta-dashboard',
    publicUrl: 'https://instapilot.iamoex.com',
    tunnelName: 'insta-dashboard-stable',
    tunnelId: '1e801c26-c515-4c57-8e27-b8660838f142',
    status: 'online',
    stack: ['Next.js', 'TypeScript', 'Prisma'],
  },
  {
    name: 'Betfair Trading Agent',
    description: 'Agente autónomo SIM/LIVE con dashboard de riesgo y journal.',
    repoUrl: 'https://github.com/MOREXPO/betfair-trading-agent',
    publicUrl: 'https://betfair-trading.iamoex.com',
    tunnelName: 'betfair-trading-stable',
    tunnelId: '9a733954-4c8b-49d5-a1f1-03295e7bc348',
    status: 'online',
    stack: ['Node.js', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
  },
  {
    name: 'Respiratory News Dashboard',
    description: 'Monitor de noticias por empresa y rango de fechas.',
    repoUrl: 'https://github.com/MOREXPO/respiratory-news-dashboard',
    publicUrl: 'https://respiratory-news.iamoex.com',
    tunnelName: 'respiratory-news-stable',
    tunnelId: 'ec4d92d3-5aa2-4ff5-bb27-de4b1a11ae77',
    status: 'online',
    stack: ['Next.js', 'TypeScript', 'API routes'],
  },
];
