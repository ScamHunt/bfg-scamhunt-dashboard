import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DataCardProps {
  content: { title: string; data: string }[];
}

export const NumberCard: React.FC<DataCardProps> = ({ content }) => {
  return (
    <Card>
      {content.map((item, index) => (
        <>
          <CardHeader key={index}>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-xl font-bold'>{item.data.charAt(0).toUpperCase() + item.data.slice(1)}</div>
          </CardContent>
        </>
      ))}
    </Card>
  );
};
