import sort from 'fast-sort';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue?: string;
  formattedDate?: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

function getColumnName(
  column: 'Título' | 'Preço' | 'Categoria' | 'Data',
): 'title' | 'value' | 'created_at' | ['category', 'title'] {
  switch (column) {
    case 'Título':
      return 'title';
    case 'Preço':
      return 'value';
    case 'Categoria':
      return ['category', 'title'];
    case 'Data':
      return 'created_at';
    default:
      return 'title';
  }
}

export default function sortData(
  data: Transaction[],
  column: 'Título' | 'Preço' | 'Categoria' | 'Data',
  direction = 'crescent',
): Transaction[] {
  const columnName = getColumnName(column);
  if (typeof columnName === 'string') {
    if (direction === 'decrescent') {
      return sort(data).desc((item: Transaction) => item[columnName]);
    }
    const teste = sort(data).asc((item: Transaction) => item[columnName]);
    return teste;
  }

  if (direction === 'decrescent') {
    return sort(data).desc(
      (item: Transaction) => item[columnName[0]][columnName[1]],
    );
  }
  return sort(data).asc(
    (item: Transaction) => item[columnName[0]][columnName[1]],
  );
}
