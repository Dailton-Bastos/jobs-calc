interface HeadingProps {
  children: string;
}

export const Heading = ({ children }: HeadingProps) => {
  return <h1>{children}</h1>;
};
