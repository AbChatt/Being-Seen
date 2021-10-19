import payPalSdk from "@paypal/checkout-server-sdk";

/**
 * Returns PayPal HTTP client instance with environment which has access
 * credentials context. This can be used invoke PayPal API's provided the
 * credentials have the access to do so.
 */
const client = () => new payPalSdk.core.PayPalHttpClient(environment());

/**
 * Setting up and Returns PayPal SDK environment with PayPal Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be
 * LiveEnvironment.
 */
const environment = () => {
  const clientId =
    "AQRv7RvP2Klz56NL3TgX3a-fbaDeL7NJj8ql5v96GehLn_PfDpFUvpaTl_5VbfV7nyU4Z44XElGPgxo5";
  const clientSecret =
    "ELOuK7Qo6XDHw7vS4rU7tThSFq4BA2SQfcOnBcjJlGCMeSOMhVWm3f0HYzEbeUPjDbDy-fVkwOoHGIks";
  return new payPalSdk.core.SandboxEnvironment(clientId, clientSecret);
};

export default client;