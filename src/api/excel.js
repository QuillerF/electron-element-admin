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
 * 删除一个居民
 *
 * @param {*} villagerId 参数
 */

export function VILLAGER_MANAGER_DELETE(villagerId) {
  return request({
    url: 'villager/manager/delete',
    method: 'delete',
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
	"politicalStatus": "",
	"religion": "",
	"searchName": "",
	"orderBy": "",
	"page": 0,
	"size": 0
 *
 */

export function VILLAGER_MANAGER_LIST(data) {
  return request({
    url: 'villager/manager/list',
    method: 'post',
    data
  })
  // return Promise.resolve({
  //   total: 30,
  //   data: [
  //     {
  //       birthday: '2018-5-2',
  //       education: '小学',
  //       familyIncome: 2000,
  //       farmlandMu: 10,
  //       farmlandRemark: 'ad',
  //       gender: '男',
  //       groupId: '123',
  //       groupName: '一组',
  //       hhRegistryMaster: '阿道夫',
  //       hhRegistryNo: '阿道夫',
  //       hhRegistrySelf: 'adsf',
  //       hhRelation: '阿道夫',
  //       houseHolderName: '阿斯蒂芬',
  //       id: '2asdfasfsdf ',
  //       idCardBack: 'asdf',
  //       idCardFront: 'adfaf',
  //       idCardNo: 'adfasfd',
  //       insurance: '是',
  //       isFiveGuarantee: '是',
  //       isLowIncome: '是',
  //       isMilitaryFamily: '是',
  //       isMoveIn: '是',
  //       isOnlyChild: '是',
  //       isPoverty: '是',
  //       marriage: '阿道夫',
  //       military: '阿斯蒂芬',
  //       moveInDate: 'adf',
  //       moveInReason: 'asdf',
  //       moveInRemark: '阿斯蒂芬',
  //       name: '阿斯蒂芬',
  //       nation: '阿斯蒂芬',
  //       phone: '按地方撒',
  //       politicalStatus: 'asdf',
  //       religion: '阿斯蒂芬',
  //       remark: '阿斯蒂芬',
  //       residenceAddress: 'asd发送到',
  //       residentialAddress: '阿斯蒂芬',
  //       wordType: 'asd '
  //     }
  //   ]
  // })
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

/**
 * 获取单个审核的详情
 * @param {*} approveId 参数
 */
export function APPROVE_DETAIL(approveId) {
  return request({
    url: 'approve/detail',
    method: 'get',
    params: { approveId }
  })
}
/**
 * 管理员处理审核
 * @param {*} approveId 参数
 * @param {*} type 1同意 2拒绝
 */
export function APPROVE_HANDLE(params) {
  return request({
    url: 'approve/handle',
    method: 'put',
    params
  })
}
/**
 * 撤回
 * @param {*} approveId 参数
 */
export function APPROVE_CANCEL(approveId) {
  return request({
    url: 'approve/cancel',
    method: 'put',
    params: { approveId }
  })
}
/**
 * 获取审核列表，组长只能获取自己提交的审核列表， 管理员可以获取全部的审核列表用于操作
	"approveStatus": 0,
	"groupName": [],
	"page": 0,
	"size": 0
 */
export function APPROVE_LIST(data) {
  return request({
    url: 'approve/list',
    method: 'post',
    data
  })
}

/**
 * 组长删除被驳回的信息
	"approveId": 0,
 */
export function APPROVE_DELETE(approveId) {
  return request({
    url: 'approve/delete',
    method: 'delete',
    params: { approveId }
  })
}

export default {
  VILLAGER_MANAGER_UPDATE_ONE,
  VILLAGER_MANAGER_LIST,
  VILLAGER_MANAGER_DETAIL,
  VILLAGER_MANAGER_ADD_ONE,
  VILLAGER_MANAGER_ADD_BATCH,
  VILLAGER_MANAGER_DELETE,
  APPROVE_LIST,
  APPROVE_HANDLE,
  APPROVE_DETAIL,
  APPROVE_CANCEL,
  APPROVE_DELETE
}
