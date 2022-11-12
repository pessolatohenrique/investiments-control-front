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

  if (strMoney && strMoney.toString().includes("R$")) {
    formatedValue = strMoney
      .replace(/\./g, "")
      .replace(",", ".")
      .replace("R$", "")
      .trim();
  }

  return formatedValue;
}
