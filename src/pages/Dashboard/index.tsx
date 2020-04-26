import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';
import sortData from '../../utils/sortData';

import { Container, CardContainer, Card, TableContainer } from './styles';

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

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface Column {
  name: 'Título' | 'Preço' | 'Categoria' | 'Data';
  direction: string;
}

interface IconElement {
  direction: string;
}

function Icon({ direction }: IconElement): JSX.Element {
  const color = direction === 'none' ? '#969cb3' : '#ff872c';

  return direction === 'crescent' ? (
    <FiChevronUp color={color} />
  ) : (
    <FiChevronDown color={color} />
  );
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [columns, setColumns] = useState<Column[]>([
    { name: 'Título', direction: 'none' },
    { name: 'Preço', direction: 'none' },
    { name: 'Categoria', direction: 'none' },
    { name: 'Data', direction: 'none' },
  ]);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('/transactions');
      const formatedTransactions = data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedDate: formatDate(transaction.created_at),
          formattedValue: `
            ${transaction.type === 'outcome' ? '- ' : ''}
            ${formatValue(transaction.value)}
          `,
        }),
      );

      setTransactions(formatedTransactions);
      setBalance(data.balance);
    }

    loadTransactions();
  }, []);

  function handleSelectColumn(columnName: string): void {
    const newColumns = columns.map(column => {
      if (column.name === columnName) {
        if (column.direction === 'crescent') {
          const newColumn = { name: column.name, direction: 'decrescent' };
          const sortedTransactions = sortData(
            transactions,
            newColumn.name,
            newColumn.direction,
          );
          setTransactions(sortedTransactions);
          return newColumn;
        }
        const newColumn = { name: column.name, direction: 'crescent' };
        const sortedTransactions = sortData(
          transactions,
          newColumn.name,
          newColumn.direction,
        );

        setTransactions(sortedTransactions);
        return newColumn;
      }

      return { name: column.name, direction: 'none' };
    });

    setColumns(newColumns);
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {formatValue(balance.income || 0)}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance.outcome || 0)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {formatValue(balance.total || 0)}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.name}>
                    <button
                      type="button"
                      onClick={() => handleSelectColumn(column.name)}
                    >
                      {column.name}
                      <Icon direction={column.direction} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.formattedValue}
                    </td>
                    <td>{transaction.category?.title}</td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
