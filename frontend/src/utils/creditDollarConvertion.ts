const conversionRate = 5;

const creditToDollar = (credit: number) => credit * conversionRate;

const dollarToCredit = (dollar: number) => dollar / conversionRate;

export { creditToDollar, dollarToCredit };
