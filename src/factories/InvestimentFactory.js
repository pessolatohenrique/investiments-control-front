import InvestimentTypes from "../enums/InvestimentTypes";
import { InvalidFactory } from "../utils/errors";

class InvestimentFactory {
  constructor() {}
  create = (type, resultFind = null) => {
    try {
      console.log("created create!!!");
      const investiment = new InvestimentTypes[type](resultFind);
      return investiment;
    } catch (error) {
      throw new InvalidFactory();
    }
  };
}

export default InvestimentFactory;
