
const conversion_rate = 5
function donation_to_credit(donation){
    donation = donation / conversion_rate;
    return donation;
}


function credit_to_donation(credit){
    credit = credit * conversion_rate;
    return credit;
}

export {donation_to_credit, credit_to_donation};