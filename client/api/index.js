import config from '../config/config.json'

const myRequest = (api,method,data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			header: {
				'content-type': 'application/x-www-form-urlencoded', 
			},
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
const postThings = (api,data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			header: {
				'content-type': 'application/json', 
			},
			url:`${config.serverUrl}/${api}`,
			method:'POST',
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
const getMedals = ()=>{
	return new Promise(async (resolve,reject)=>{
		try{
			let token = uni.getStorageSync('userToken');
			let data = await myRequest('getMedals','GET',{
				token:token
			});
			resolve(data);
		}catch(err){
			reject(err);
		}
	})
}

const login = (data)=>{
	return new Promise(async(resolve,reject)=>{
		try{
			let res = await postThings('signIn/login',data);
			if(res.status){
				uni.setStorageSync('userToken',res.token);
			}
			resolve(res);
		}catch(err){
			reject(err);
		}
	});
}

const verify = ()=>{
	return new Promise(async (resolve,reject)=>{
		try{
			let token = uni.getStorageSync('userToken');
			let data = await myRequest('signIn/verify','GET',{
				token:token
			});
			resolve(data);
		}catch(err){
			reject(err);
		}
	})
}

module.exports = {
	getMedals:getMedals,
	login:login,
	verify:verify
}