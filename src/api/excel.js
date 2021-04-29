import request from '@/utils/request'

/**
 * 添加多个居民
 * @param {*}
		"gender": "",
		"groupId": "",
		"groupName": "",
		"hhRegistryNo": "",
		"hhRelation": "",
		"houseHolderName": "",
		"id": "",
		"idCardNo": "",
		"name": "",
		"phone": "" 参数
 * @param {*} nickname 参数
 * @param {*} phone 参数
 * @param {*} roleId 参数
 * @param {*} username 参数
 */

export function VILLAGER_MANAGER_ADD_BATCH(data) {
  return request({
    url: 'villager/manager/add-batch',
    method: 'post',
    data
  })
}

/**
 * 添加单个
 * 	"birthday": "",
	"education": "",
	"familyIncome": 0,
	"farmlandMu": "",
	"farmlandRemark": "",
	"gender": "",
	"groupId": "",
	"groupName": "",
	"hhRegistryMaster": "",
	"hhRegistryNo": "",
	"hhRegistrySelf": "",
	"hhRelation": "",
	"houseHolderName": "",
	"id": "",
	"idCardBack": "",
	"idCardFront": "",
	"idCardNo": "",
	"insurance": "",
	"isFiveGuarantee": "",
	"isLowIncome": "",
	"isMilitaryFamily": "",
	"isMoveIn": "",
	"isOnlyChild": "",
	"isPoverty": "",
	"marriage": "",
	"military": "",
	"moveInDate": "",
	"moveInReason": "",
	"moveInRemark": "",
	"name": "",
	"nation": "",
	"phone": "",
	"politicalStatus": "",
	"religion": "",
	"remark": "",
	"residenceAddress": "",
	"residentialAddress": "",
	"wordType": "
 */

export function VILLAGER_MANAGER_ADD_ONE(data) {
  return request({
    url: 'villager/manager/add-one',
    method: 'post',
    data
  })
}

/**
 * 获取一个居民详情
 *
 * @param {*} villagerId 参数
 */

export function VILLAGER_MANAGER_DETAIL(villagerId) {
  return request({
    url: 'villager/manager/detail',
    method: 'get',
    params: {
      villagerId
    }
  })
}

/**
 * 获取居民列表
 * 	"birthdayEndDate": "",
	"birthdayStartDate": "",
	"education": "",
	"familyIncomeEnd": 0,
	"familyIncomeStart": 0,
	"farmlandMuEnd": "",
	"farmlandMuStart": "",
	"groupName": "",
	"insurance": "",
	"isFiveGuarantee": "",
	"isLowIncome": "",
	"isMilitaryFamily": "",
	"isOnlyChild": "",
	"isPoverty": "",
	"marriage": "",
	"nation": "",
	"orderBy": "",
	"page": 0,
	"politicalStatus": "",
	"religion": "",
	"searchName": "",
	"size": 0
 *
 */

export function VILLAGER_MANAGER_LIST(data) {
  return request({
    url: 'villager/manager/list',
    method: 'post',
    data
  })
}

/**
 * 修改一个居民
 *
	"birthday": "",
	"education": "",
	"familyIncome": 0,
	"farmlandMu": "",
	"farmlandRemark": "",
	"gender": "",
	"groupId": "",
	"groupName": "",
	"hhRegistryMaster": "",
	"hhRegistryNo": "",
	"hhRegistrySelf": "",
	"hhRelation": "",
	"houseHolderName": "",
	"id": "",
	"idCardBack": "",
	"idCardFront": "",
	"idCardNo": "",
	"insurance": "",
	"isFiveGuarantee": "",
	"isLowIncome": "",
	"isMilitaryFamily": "",
	"isMoveIn": "",
	"isOnlyChild": "",
	"isPoverty": "",
	"marriage": "",
	"military": "",
	"moveInDate": "",
	"moveInReason": "",
	"moveInRemark": "",
	"name": "",
	"nation": "",
	"phone": "",
	"politicalStatus": "",
	"religion": "",
	"remark": "",
	"residenceAddress": "",
	"residentialAddress": "",
	"wordType": ""
 *
 */

export function VILLAGER_MANAGER_UPDATE_ONE(data) {
  return request({
    url: 'villager/manager/update-one',
    method: 'put',
    data
  })
}

export default {
  VILLAGER_MANAGER_UPDATE_ONE,
  VILLAGER_MANAGER_LIST,
  VILLAGER_MANAGER_DETAIL,
  VILLAGER_MANAGER_ADD_ONE,
  VILLAGER_MANAGER_ADD_BATCH
}
