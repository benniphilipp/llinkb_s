document.addEventListener('DOMContentLoaded', function() {

  function stipeChackOut(){
    const getCookie =(name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');


     
    // This is your test publishable API key.
    const stripe = clientSecretEnv;

    const DomainSuccess = document.querySelector('#DomainSuccess').value;
   
    const meinElement = document.getElementById('dataShoppingId');
    const dateValue = meinElement.getAttribute('data-shopping-id');

    const userEmailElement = document.getElementById('userEmail');
    const emailAddress = userEmailElement.getAttribute('data-user-email');

    const urlElement = document.getElementById('UrlData');
    const url = urlElement.getAttribute('data-url');

    // The items the customer wants to buy
    const items = [{ id: dateValue }];

    const DataUrl = document.querySelector('#DomainCheckoutView');

    let elements;

    initialize();
    checkStatus();

    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
    const response = await fetch(DataUrl.value, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ items }),
    });
        
    const { clientSecret } = await response.json();

    const appearance = {
        theme: 'stripe',
    };

    elements = stripe.elements({ 
        clientSecret: clientSecret
    });
  

    const paymentElementOptions = {
        layout: "tabs",
    };

    const paymentElement = elements.create("payment", paymentElementOptions);
        paymentElement.mount("#payment-element");
}



async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: url, //'http://127.0.0.1:8000/en/domain/success/',
      receipt_email: emailAddress,
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageContainer.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

} // Function end

const DomainSuccess = document.querySelector('#DomainSuccess');
if(DomainSuccess){
  setTimeout(() => {
    stipeChackOut();
  }, 1000)
}


})