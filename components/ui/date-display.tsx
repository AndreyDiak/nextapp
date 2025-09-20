interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  date: Date;
}

export const DateDisplay = ({ date, ...props }: Props) => {
  return (
    <span {...props}>
      {new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(date))}
    </span>
  );
};
