import axios from "axios";
import config from "../config/config.json";
let url = config.serverUrl;

const login = (data) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/signIn/adminLogin', data);
        resolve(res.data);
    })
}

const verify = (token) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/signIn/adminVerify', { token: token });
        resolve(res.data);
    })
}

const getMedalsAll = (token) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/admin/getMedalsAll', { token: token });
        resolve(res.data);
    })
}

const changeMedal = (data) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/admin/changeMedal', data);
        resolve(res.data);
    })
}

const addMedal = (data) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/admin/addMedal', data);
        resolve(res.data);
    })
}

const deleteMedal = (token) => {
    return new Promise(async(resolve, reject) => {
        let res = await axios.post(url + '/admin/deleteMedal', data);
        resolve(res.data);
    })
}

export default {
    login: login,
    verify: verify,
    getMedalsAll: getMedalsAll,
    changeMedal: changeMedal,
    addMedal: addMedal,
    deleteMedal: deleteMedal
}