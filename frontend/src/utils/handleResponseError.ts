import { AxiosResponse } from "axios";

// A simple utility method to perform error handling on failed requests. The
// toast parameter must be the toast function from "react-toastify" package.
const handleResponseError = (response: AxiosResponse, toast: any) => {
  if (response && response.data) {
    if (response.data.message) {
      toast.error(response.data.message);
    } else {
      toast.error("Unknown error");
      console.log(response.data);
    }
  } else {
    toast.error("Request could not be made");
    console.log(response);
  }
};

export default handleResponseError;
