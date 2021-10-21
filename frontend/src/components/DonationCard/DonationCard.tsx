import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { toast, ToastContainer } from "react-toastify";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import { Donation } from "common/Types";
import DonationsTable from "components/DonationsTable";

import axiosBase from "utils/axiosBase";
import handleResponseError from "utils/handleResponseError";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface StatisticProps {
  stat: string | number;
  label: string;
}

// Renders a statistic followed by a label (used for donations card)
const Statistic = ({ stat, label }: StatisticProps) => (
  <div style={{ textAlign: "center" }}>
    <Typography sx={{ fontWeight: 700 }} variant="h6">
      {stat}
    </Typography>
    <Typography color="text.secondary">{label}</Typography>
  </div>
);

interface DonationCardProps {
  donations: Donation[];
  youthUsername: string;
  donorUsername?: string;
}

const DonationCard = ({
  donations,
  youthUsername,
  donorUsername,
}: DonationCardProps) => {
  const [donationAmount, setDonationAmount] = useState("5");
  const validDonationAmounts = ["5", "10", "25", "100"];

  let previousDonationsTotal = 0;
  donations.forEach((donation) => (previousDonationsTotal += donation.amount));

  const handleDonationAmountChange = (
    event: React.MouseEvent<HTMLElement>,
    amount: string
  ) => {
    if (amount !== null) {
      setDonationAmount(amount);
    }
  };

  return (
    <Card style={{ background: "rgba(0 0 0 / 2%)" }}>
      <ToastContainer theme="colored" />
      <CardContent>
        <Grid container sx={{ mb: 2.5 }}>
          <Grid item xs={4}>
            <Statistic stat={`$${previousDonationsTotal}`} label="raised" />
          </Grid>
          <Grid item xs={4}>
            <Statistic stat={donations.length} label="donations" />
          </Grid>
          <Grid item xs={4}>
            <Statistic stat={0} label="followers" />
          </Grid>
        </Grid>
        {donations.length !== 0 && <DonationsTable donations={donations} />}
        {donorUsername && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <Typography variant="h5">Donate Now</Typography>
            <ToggleButtonGroup
              exclusive
              value={donationAmount}
              onChange={handleDonationAmountChange}
              sx={{ my: 2.5 }}
            >
              {validDonationAmounts.map((v) => (
                <ToggleButton key={v} color="primary" value={v}>
                  ${v}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <PayPalButton
              createOrder={() =>
                axiosBase
                  .post("/payment/donation/create", {
                    amount: donationAmount,
                    youth: youthUsername,
                    donor: donorUsername,
                  })
                  .then((response) => response.data.message)
                  .catch(({ response }) => handleResponseError(response, toast))
              }
              onApprove={(data: any, actions: any) =>
                actions.order.capture().then((details: { id: string }) => {
                  axiosBase
                    .post("/payment/donation/save", { orderId: details.id })
                    .then((response) => toast.success(response.data.message))
                    .catch(({ response }) =>
                      handleResponseError(response, toast)
                    );
                })
              }
              options={{
                currency: "CAD",
                clientId:
                  "AV1x6EmVIuywrckX_H7LT9SRMBWhqLh5oW-G-56kkLMiOAFqTcFeVnuppNTZd1oJVqZSNQ3ufYpyObz9",
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DonationCard;
