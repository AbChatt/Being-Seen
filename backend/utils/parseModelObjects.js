import Donation from "../models/Donation.js";
import Youth from "../models/Youth.js";
import Donor from "../models/Donor.js";

const parseRetrievedDonation = async (retrievedDonation) => {
  const retrievedDonor = await Donor.findOne({
    username: retrievedDonation.donor,
  });

  const retrievedYouth = await Youth.findOne({
    username: retrievedDonation.youth,
  });

  return {
    donor: retrievedDonor.display_name,
    youth: retrievedYouth.name,
    amount: retrievedDonation.amount,
    date: retrievedDonation.date,
  };
};

const parseRetrievedYouth = async (retrievedYouth, onlyPublic) => {
  const rawDonations = await Donation.find({
    youth: retrievedYouth.username,
  });

  const parsedDonations = await Promise.all(
    rawDonations.map((donation) => parseRetrievedDonation(donation))
  );

  const publicInformation = {
    name: retrievedYouth.name,
    username: retrievedYouth.username,
    date_of_birth: retrievedYouth.date_of_birth,
    profile_picture: retrievedYouth.profile_picture,
    saving_plan: retrievedYouth.saving_plan,
    story: retrievedYouth.story,
    donations: parsedDonations,
  };

  const privateInformation = {
    credit_balance: retrievedYouth.credit_balance,
  };

  return {
    ...publicInformation,
    ...(!onlyPublic && privateInformation),
  };
};

const parseRetrievedDonor = async (retrievedDonor) => {
  const rawDonations = await Donation.find({
    donor: retrievedDonor.username,
  });

  const parsedDonations = await Promise.all(
    rawDonations.map((donation) => parseRetrievedDonation(donation))
  );

  return {
    name: retrievedDonor.name,
    username: retrievedDonor.username,
    date_of_birth: retrievedDonor.date_of_birth,
    profile_picture: retrievedDonor.profile_picture,
    organization: retrievedDonor.organization,
    anonymize: retrievedDonor.anonymize,
    donations: parsedDonations,
  };
};

const parseRetrievedMerchant = (retrievedMerchant) => ({
  name: retrievedMerchant.name,
  username: retrievedMerchant.username,
  date_of_birth: retrievedMerchant.date_of_birth,
  profile_picture: retrievedMerchant.profile_picture,
  store_location: retrievedMerchant.store_location,
  store_name: retrievedMerchant.store_name,
  email: retrievedMerchant.email,
});

const parseRetrievedProduct = (retrievedProduct) => ({
  name: retrievedProduct.name,
  description: retrievedProduct.description,
  picture: retrievedProduct.picture,
  merchant: retrievedProduct.merchant,
  price: retrievedProduct.price,
});

export {
  parseRetrievedDonation,
  parseRetrievedYouth,
  parseRetrievedDonor,
  parseRetrievedMerchant,
  parseRetrievedProduct,
};
