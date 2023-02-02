import InvestimentFactory from "./InvestimentFactory";
import { InvalidFactory } from "../utils/errors";

describe("InvestimentFactory", () => {
  it("should create valid types", () => {
    const investimentModel = new InvestimentFactory();
    const checkingAccount = investimentModel.create("CHECKING_ACCOUNT");
    const emergencyReserve = investimentModel.create("EMERGENCY_RESERVE");
    const fixedIncome = investimentModel.create("FIXED_INCOME");
    const variableIncomeFunds = investimentModel.create(
      "VARIABLE_INCOME_FUNDS"
    );
    const variableIncomeShares = investimentModel.create(
      "VARIABLE_INCOME_SHARES"
    );

    expect(checkingAccount).toHaveProperty("getIdentifyColor");
    expect(emergencyReserve).toHaveProperty("getIdentifyColor");
    expect(fixedIncome).toHaveProperty("getIdentifyColor");
    expect(variableIncomeFunds).toHaveProperty("getIdentifyColor");
    expect(variableIncomeShares).toHaveProperty("getIdentifyColor");
  });

  it("should throw error in factory when type is invalid", () => {
    const investimentModel = new InvestimentFactory();
    expect(() => investimentModel.create("INVALID_TYPE")).toThrow(
      InvalidFactory
    );
  });
});
