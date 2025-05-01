import axiosInstance from "../constant";

export const api = async (url, payload = null, token = null) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const headers = {
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  if (payload === null) {
    return axiosInstance.get(url, { headers, signal });
  } else {
    return axiosInstance.post(url, payload, { headers, signal });
  }
};
