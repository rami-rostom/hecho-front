# Modèle appel API

## Fonction template

```ts
import { useEffect, useState } from 'react';

export const useAsyncFetch = <TData>(url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<TData>();

  useEffect(() => {
    setIsLoading(true);
    setError(undefined);
    fetch('https://mon-url-api')
      .then((r) => {
        if (!r.ok) {
          throw new Error(r.statusText);
        } else {
          return r.json();
        }
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);

  return (isLoading, error, data);
}
```

## Appel API dans le composant

```ts
import { useAsyncFetch } from '../../hooks/useAsyncFetch';

function Home() {
  const { data: nomData, isLoading, error } = useAsyncFetch<TData[]>(
    'https://oblog-react.vercel.app/api/posts'
  );

  if (error) {
    throw error;
  }

  return (
    <main>
      {isLoading && (
        <p>Chargement des données</p>
      )}

      {nomData && (
        <h1>{nomData.title}</h1>
      )}
    </main>
  );
}

export default Home;
```