export default function formatDate(date: Date): string {
  const receivedDate = new Date(date);

  return receivedDate.toLocaleDateString('pt-BR');
}
