type Props = {
  title: string;
  children: React.ReactNode;
};

export function RepoCardGrid({ title, children }: Props) {
  return (
    <div>
      <h2 className="font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">{children}</div>
    </div>
  );
}
