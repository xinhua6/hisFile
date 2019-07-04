import ajax from './ajax'
const BASE_URL = '/api'


export const reqSmsCode = (userIphone) => ajax(BASE_URL+'/user/code.do', {userIphone},'POST');
//请求历史数据
export const reqHisFile = (companyUuid) => ajax(BASE_URL+'/hisFile',{companyUuid});
//请求删除数据
export const reqDeleFile = (modelUuid) => ajax(BASE_URL+'/deleteFile',{modelUuid})
//
