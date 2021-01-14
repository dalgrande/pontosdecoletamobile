import axios from "axios";


export const local = axios.create({
  baseURL: "http://api.freetime.works/",
});



export const ibge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1",
});
