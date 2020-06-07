import axios from "axios";

export const local = axios.create({
  baseURL: `http://192.168.0.54:3333`,
});
export const ibge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1",
});
