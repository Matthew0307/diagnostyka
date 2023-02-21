import { ReactNode, useEffect, useState } from "react";

type AsyncProps<T> = {
  action: () => Promise<T>;
  children: (value: T) => ReactNode;
};

export function Async<T>({ action, children }: AsyncProps<T>) {
  const [isReady, setIsReady] = useState(false);
  const [childData, setChildData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      return;
    }
    (async () => {
      try {
        setIsLoading(true);
        const res = await action();
        setChildData(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error);
      }
    })();
  }, [action, isReady]);

  if (!childData || isLoading) {
    return <h1>Ładowanie...</h1>;
  }

  return <>{children(childData)}</>;
}
