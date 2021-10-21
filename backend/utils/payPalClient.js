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
    "AXidlZhw-HrSH88Cl7DZnDKHKXICHElpSTshdoog9mSJORngN52503ugVpsUQNrJUfUDSp2jgAHoav6K";
  const clientSecret =
    "EJ9y6s2j3fRWhtIKQjlF8PIFQ6F3g8umkkbwoqDK-LIMytgc5z7IbSUQrxOPsvIs2SF7Yx0iYCI0qNYe";
  return new payPalSdk.core.SandboxEnvironment(clientId, clientSecret);
};

export default client;
