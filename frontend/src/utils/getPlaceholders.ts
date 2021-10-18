import moment from "moment";
import { Donation, PublicYouth } from "common/Types";

const getDonation = (id: number): Donation => ({
  donor: `Donald Trump #${id}`,
  youth: `Barack Obama #${id}`,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/800px-Donald_Trump_official_portrait.jpg",
  date: moment().toISOString(),
  amount: 1200,
});

const getDonations = (): Donation[] =>
  [...Array(30)].map((v, i) => getDonation(i));

const getPublicYouth = (id: number): PublicYouth => ({
  name: `Barack Obama`,
  username: `BarackObama${id}`,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/President_Barack_Obama%2C_2012_portrait_crop.jpg/800px-President_Barack_Obama%2C_2012_portrait_crop.jpg",
  story: `Barack Hussein Obama II is an American politician, author, and retired attorney who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, Obama was the first African-American president of the United States. He previously served as a U.S. senator from Illinois from 2005 to 2008 and as an Illinois state senator from 1997 to 2004. Outside of politics, Obama has published three bestselling books; Dreams from My Father (1995), The Audacity of Hope (2006) and A Promised Land (2020).[2]
  
Obama was born in Honolulu, Hawaii. After graduating from Columbia University in 1983, he worked as a community organizer in Chicago. In 1988, he enrolled in Harvard Law School, where he was the first black president of the Harvard Law Review. After graduating, he became a civil rights attorney and an academic, teaching constitutional law at the University of Chicago Law School from 1992 to 2004. Turning to elective politics, he represented the 13th district in the Illinois Senate from 1997 until 2004, when he ran for the U.S. Senate. Obama received national attention in 2004 with his March Senate primary win, his well-received July Democratic National Convention keynote address, and his landslide November election to the Senate. In 2008, a year after beginning his campaign, and after a close primary campaign against Hillary Clinton, he was nominated by the Democratic Party for president. Obama was elected over Republican nominee John McCain in the general election and was inaugurated alongside his running mate, Joe Biden, on January 20, 2009. Nine months later, he was named the 2009 Nobel Peace Prize laureate.`,
  savingPlan: `* Needs x, y, z in order to do a, b, c
* Needs x, y, z in order to do a, b, c
* Needs x, y, z in order to do a, b, c
* Needs x, y, z in order to do a, b, c`,
  donations: getDonations(),
  dob: moment([1961, 8, 4]).toISOString(),
});

const getPublicYouths = (): PublicYouth[] =>
  [...Array(30)].map((v, i) => getPublicYouth(i));

export { getDonation, getDonations, getPublicYouth, getPublicYouths };
