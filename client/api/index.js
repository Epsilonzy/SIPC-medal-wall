import config from '../config/config.json'

const myRequest = (api,method,data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:`${config.serverUrl}/${api}`,
			method:method,
			data:data,
			success:(res)=>{
				resolve(res.data);
			},
			fail:(err)=>{
				reject(err);
			}
		})
	})
}

const getMedals = (userToken)=>{
	return new Promise(async (resolve,reject)=>{
		try{
			let data = await myRequest('getMedals','GET',userToken);
			resolve(data);
		}catch(err){
			reject(err);
		}
	})
}

module.exports = {
	getMedals:getMedals
}