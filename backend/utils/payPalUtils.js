// helper function that handle payOut request body
async function createPayOutBody(productInfo){
    let senderBatchId = "Test_sdk_" + Math.random().toString(36).substring(7);
    const price = productInfo.price;
    const currency = productInfo.currency;
    const receiverEmail = productInfo.email;
    return {
        sender_batch_header: {
          recipient_type: "EMAIL",
          note: "Enjoy your Payout!!",
          sender_batch_id: senderBatchId,
          email_subject: "This is a test transaction from SDK",
        },
        items: [
          {
            amount: {
              currency: currency,
              value: price,
            },
            receiver: receiverEmail,
            sender_item_id: "Test_txn_1",
          },
        ],
      };
}

export default createPayOutBody;