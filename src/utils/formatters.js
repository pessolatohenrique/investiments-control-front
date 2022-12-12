export function formatCpf(valueToFormat) {
  return valueToFormat
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function formatCpfToString(valueToFormat) {
  return valueToFormat.replace(/[^0-9]/g, "");
}

export function formatMoneyToDecimal(strMoney) {
  let formatedValue = strMoney;
  const condition =
    (strMoney && strMoney.toString().includes("R$")) ||
    (strMoney && strMoney.toString().includes("%"));

  if (condition) {
    formatedValue = strMoney
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
      .replace("R$", "")
      .replace("%", "")
      .trim();
  }

  return formatedValue;
}
