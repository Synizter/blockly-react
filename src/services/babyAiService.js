import axios from "axios";

const BASE_URL = `http://babyai.org:5000/`;
const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/plain",
};

export const babyAiService = async (data) => {
  const response = await axios.post(BASE_URL + 'execute', data, {
    headers: HEADERS,
    withCredentials: true,
    credentials: "same-origin",
  });
  return response;
};

export const exportWorkspace = async (data) => {
  const response = await axios.post(BASE_URL + 'workspace/export', data, {
    headers: HEADERS,
    withCredentials: true,
    credentials: "same-origin",
  });
  return response;
}
