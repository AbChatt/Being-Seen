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
    "AWicEzH0zpWmLIeGBODTWvSLhVfYDlBq8f2-O_VZX2AhPQb9VAbLMja1VAKyf9XeOztSlSJd88zQ06Nd";
  const clientSecret =
    "EB43JmHCCF9vkr52JicXy4RKbtvb69xYAzCOzb_bTFcx4tGFXCoDLTKdbuhdqYS9PdpPAX29nBzK7hgx";
  return new payPalSdk.core.SandboxEnvironment(clientId, clientSecret);
};

export default client;