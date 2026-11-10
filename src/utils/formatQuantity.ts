export default function formatQuantity(totalAmount: number, unit: string) {
  const formattedAmount = totalAmount.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  return `${formattedAmount} ${unit}`;
}
