import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DataCardProps {
  content: { title: string; data: string }[];
  className?: string;
}

export const NumberCard = ({ content, className }: DataCardProps) => {
  return (
    <Card key={`num-card-${content.length}`} className={className}>
      {content.map((item, index) => (
        <div key={`num-card-${index}`}>
          <CardHeader key={index}>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-xl font-bold'>
              {item.data.charAt(0).toUpperCase() + item.data.slice(1)}
            </div>
          </CardContent>
        </div>
      ))}
    </Card>
  );
};
