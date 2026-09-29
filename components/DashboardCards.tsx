

type DashboardCardProps = {
  title: string;
  value: number;
  bgColor: string;
};
export default function DashboardCards  ( {title,value,bgColor,}: DashboardCardProps) {

    return (

        <div className={`flex-1 ${bgColor} p-5 rounded-lg shadow`}>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-3xl font-bold">{value}</p>

            </div>
        </div>

    );
}