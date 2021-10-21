const conversion_rate = 5;

const donationToCredit = (donation) => {
  donation = donation / conversion_rate;
  return donation;
};

const creditToDonation = (credit) => {
  credit = credit * conversion_rate;
  return credit;
};

export { donationToCredit, creditToDonation };
