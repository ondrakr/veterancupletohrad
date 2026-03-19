function formatDatum(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}

type Row = { datum: string; jmeno: string; castka: number };

type PrispevkyTableProps = {
  data: Row[];
};

export default function PrispevkyTable({ data }: PrispevkyTableProps) {
  return (
    <table className="w-full min-w-[280px] border-collapse table-fixed sm:table-auto">
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td className="py-2 pr-2 sm:pr-4 text-gray-600 text-sm sm:text-base shrink-0">{formatDatum(row.datum)}</td>
            <td className="py-2 break-words">{row.jmeno}</td>
            <td className="py-2 text-right font-medium shrink-0">{row.castka} Kč</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
