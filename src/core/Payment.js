import { API } from "../backend";
import { enterInTournament } from "./helper/coreapicalls";

// Load capture
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const displayRazorpay = async (tournamentId, user, token) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const data = await fetch(`${API}/razorpay/${user._id}/${tournamentId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((t) => t.json());

  const options = {
    key: "rzp_test_qel7G6IHVgjtsm",
    amount: data.amount.toString(),
    currency: data.currency,
    name: "Fetch Battle",
    description: "Find Tournaments",
    image: "",
    order_id: data.id,
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      enterInTournament(tournamentId, token, user).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          window.location.href =
            window.location.href + `tournaments/${data._id}`;
        }
      });
      return true;
    },
    prefill: {
      name: data.name,
      email: data.email,
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};

export default displayRazorpay;
