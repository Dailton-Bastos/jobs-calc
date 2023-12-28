import React from 'react';

interface Props {
  title: string;
}

export const Head = ({ title }: Props) => {
  React.useEffect(() => {
    document.title = 'Jobs Calc';

    if (title) {
      document.title = `${title} | Jobs Calc`;
    }
  }, [title]);

  return <></>;
};
