import payPalSdk from "@paypal/payouts-sdk";

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
    const clientId = "AQQ7olvuWvgRMgrd2Sc-HAua9GA6clPRTdqAQveM2hG1cmroBXu9I0ERzRTT1L-zn9xAYDB0Fy-oHN_A";
    const clientSecret = "EIfVuEFKOlgzyXgOTXcS1beiJXCOJGYryVqYNUgZjaCddxFDfZCbHlyM9lnV89OEIUOpSl-QB1xwW4zOs";
  return new payPalSdk.core.SandboxEnvironment(clientId, clientSecret);
};

export default client;