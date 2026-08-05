import axios from "axios";

export const mockApi =  axios.create({
    baseURL:'https://6a5dca6d0ad09982aef77908.mockapi.io/'
})  

export const jsonServerApi = axios.create({
  baseURL: "http://192.168.0.177:3001",
});