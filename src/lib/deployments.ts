export type DeploymentInfo = {
  publicUrl: string;
  tunnelName: string;
  tunnelId: string;
};

export const deployedByRepo: Record<string, DeploymentInfo> = {
  taskflow: {
    publicUrl: 'https://taskflow.iamoex.com',
    tunnelName: 'taskflow-stable',
    tunnelId: '76a1783c-f1e7-4a84-a01f-829967d39d51',
  },
  'insta-dashboard': {
    publicUrl: 'https://instapilot.iamoex.com',
    tunnelName: 'insta-dashboard-stable',
    tunnelId: '1e801c26-c515-4c57-8e27-b8660838f142',
  },
  'betfair-trading-agent': {
    publicUrl: 'https://betfair-trading.iamoex.com',
    tunnelName: 'betfair-trading-stable',
    tunnelId: '9a733954-4c8b-49d5-a1f1-03295e7bc348',
  },
  'respiratory-news-dashboard': {
    publicUrl: 'https://respiratory-news.iamoex.com',
    tunnelName: 'respiratory-news-stable',
    tunnelId: 'ec4d92d3-5aa2-4ff5-bb27-de4b1a11ae77',
  },
  'iamoex-projects-dashboard': {
    publicUrl: 'https://projects.iamoex.com',
    tunnelName: 'iamoex-projects-stable',
    tunnelId: 'f5988cf9-128a-404f-ad9a-6cf0b3b37d95',
  },
};
