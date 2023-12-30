import React from 'react';

type Result = null | { state: 'sucess' } | { state: 'error'; message: string };

type CopyFnParams = {
  text: string;
  isPlainText: boolean;
};

type CopyFn = (params: CopyFnParams) => Promise<boolean>;

export const useCopyToClipboard = (): [CopyFn, Result] => {
  const [result, setResult] = React.useState<Result>(null);

  const copy: CopyFn = React.useCallback(
    async ({ text, isPlainText = true }) => {
      if (!navigator?.clipboard) {
        setResult({ state: 'error', message: 'Clipboard não suportado' });

        return false;
      }

      try {
        if (isPlainText) {
          await navigator.clipboard.writeText(text);

          setResult({ state: 'sucess' });
          return true;
        }

        const blobInput = new Blob([text], { type: 'text/html' });
        const clipboardItemInput = new ClipboardItem({
          'text/html': blobInput,
        });

        await navigator.clipboard.write([clipboardItemInput]);

        setResult({ state: 'sucess' });

        return true;
      } catch (error) {
        setResult({ state: 'error', message: 'Ocorreu um erro' });
        return false;
      } finally {
        setTimeout(() => setResult(null), 2000);
      }
    },
    [],
  );

  return [copy, result];
};
