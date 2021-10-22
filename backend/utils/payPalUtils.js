import { creditToDonation } from "../utils/creditConversion.js";
import Merchant from "../models/Merchant.js";


// helper function that handle payOut request body
async function createPayOutBody(productInfo){
    let senderBatchId = "Test_sdk_" + Math.random().toString(36).substring(7);

    const price =  creditToDonation(productInfo.price);
    const owner = Merchant.findOne({userName: productInfo.store_owner_username});
    const receiverEmail = owner.email;
    return {
        sender_batch_header: {
          recipient_type: "EMAIL",
          note: "",
          sender_batch_id: senderBatchId,
          email_subject: "",
        },
        items: [
          {
            amount: {
              currency: "CAD",
              value: price,
            },
            receiver: receiverEmail,
            sender_item_id: "Test_txn_1",
          },
        ],
      };
}

export default createPayOutBody;