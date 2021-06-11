import _ from "lodash";

export const getBalanceGameSelections = (data: any) => {
  return _.sortBy(data.balanceGameSelections, (a: any) => a.order);
};
