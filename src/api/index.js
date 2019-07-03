import ajax from './ajax'
const BASE_URL = '/api'
export const reqHisFile = (companyUuid) => ajax(BASE_URL+'/hisFile',{companyUuid},'POST');
export const reqDeleFile = ({companyUuid,modelUuid}) => ajax(BASE_URL+'/ratings',{companyUuid,modelUuid})
