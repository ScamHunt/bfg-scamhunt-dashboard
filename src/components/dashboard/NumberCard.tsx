import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface DataCardProps {
  title: string;
  content: number;
  subtitle?: string;
}

export const NumberCard: React.FC<DataCardProps> = ({
  title,
  content,
  subtitle,
}) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {/* <Icon className='text-blue-400' />; */}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{content}</div>
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>{subtitle}</p>
      </CardContent>
    </Card>
  );
};
