import axios from "axios";

const BASE_URL = `http://babyai.org:5000/execute`;
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/plain",
};

export const babyAiService = async (data) => {
  const response = await axios.post(BASE_URL, data, {
    headers: HEADERS,
    withCredentials: true,
    credentials: "same-origin",
  });
  return response;
};
