
const parseEnv = () => {
  const rssEnv = Object.entries(process.env)
    .filter(([key]) => key.startsWith('RSS_'))
    .map(([key, value]) => `${key}=${value}`);

  console.log(rssEnv.join('; '));
};

parseEnv();
