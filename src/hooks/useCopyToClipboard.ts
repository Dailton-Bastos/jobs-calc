import React from 'react';

type Result = null | { state: 'sucess' } | { state: 'error'; message: string };

export const useCopyToClipboard = () => {
  const [result, setResult] = React.useState<Result>(null);

  const copy = React.useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      setResult({ state: 'sucess' });
    } catch (error) {
      setResult({ state: 'error', message: 'Ocorreu um erro' });
      throw error;
    } finally {
      setTimeout(() => setResult(null), 2000);
    }
  }, []);

  return [copy, result] as const;
};
