import CheckingAccount from "../business/CheckingAccount";
import FixedIncome from "../business/FixedIncome";
import EmergencyReserve from "../business/EmergencyReserve";
import VariableIncomeShares from "../business/VariableIncomeShares";
import VariableIncomeFunds from "../business/VariableIncomeFunds";

const InvestimentTypes = {
  CHECKING_ACCOUNT: CheckingAccount,
  EMERGENCY_RESERVE: EmergencyReserve,
  FIXED_INCOME: FixedIncome,
  VARIABLE_INCOME_SHARES: VariableIncomeShares,
  VARIABLE_INCOME_FUNDS: VariableIncomeFunds,
};

export default InvestimentTypes;
