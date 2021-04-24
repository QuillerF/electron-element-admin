const Columns = [
  {
    label: '性别',
    prop: 'sex',
    isFilter: true,
    options: [{ label: '男' }, { label: '女' }]
  },
  {
    label: '联系方式',
    prop: 'phone',
    isDefaultShow: true
  },
  {
    label: '身份证号',
    prop: 'idcard',
    isDefaultShow: true
  },
  {
    label: '户主',
    prop: 'householder',
    isDefaultShow: true
  },
  {
    label: '与户主关系',
    prop: 'hhRelation',
    isDefaultShow: true
  },
  {
    label: '组别',
    prop: 'group',
    isDefaultShow: true,
    isFilter: true,
    isMutiple: true,
    options: [{ label: '一组' }, { label: '二组' }]
  },
  {
    label: '户号',
    prop: 'no'
  },
  {
    label: '民族',
    prop: 'nation',
    isFilter: true,
    options: [{ label: '汉族' }, { label: '非汉族' }]
  },
  {
    label: '学历',
    prop: 'nation',
    isFilter: true,
    isMutiple: true,
    options: [
      { label: '小学' },
      { label: '初中' },
      { label: '高中' },
      { label: '专科' },
      { label: '本科' },
      { label: '硕士' },
      { label: '博士' },
      { label: '其它' }
    ]
  },
  {
    label: '宗教信仰',
    prop: 'religion',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '基督教' }, { label: '佛教' }, { label: '伊斯兰教' }, { label: '其它' }]
  },
  {
    label: '参保情况',
    prop: 'insurance',
    isFilter: true,
    options: [{ label: '新农合' }, { label: '城镇居民医保' }]
  },
  {
    label: '出生日期',
    prop: 'birthday',
    isFilter: true,
    type: 'daterange'
  },
  {
    label: '是否贫困家庭',
    prop: 'isPoverty',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '是否低保',
    prop: 'isLowIncome',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '是否五保',
    prop: 'is5Guarantee',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '是否独生子女',
    prop: 'isOnlyChild',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '兵役情况',
    prop: 'military',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '是否军属家庭',
    prop: 'isMilitaryFamily',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '政治面貌',
    prop: 'politicalStatus',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '中共党员' }, { label: '共青团员' }, { label: '群众' }]
  },
  {
    label: '婚姻状况',
    prop: 'marriage',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '未婚' }, { label: '已婚' }, { label: '丧偶' }, { label: '离异' }]
  },
  {
    label: '职业',
    prop: 'professional'
  },
  {
    label: '家庭收入',
    prop: 'familyIncome',
    isFilter: true,
    type: 'numrange'
  },
  {
    label: '耕地面积',
    prop: 'arableLand',
    isFilter: true,
    type: 'numrange'
  },
  {
    label: '备注',
    prop: 'remark'
  }
]

const ChangeLogsColumns = [
  {
    label: '身份证号',
    prop: 'name'
  },
  {
    label: '变动类型',
    prop: 'type'
  },
  {
    label: '变动原因',
    prop: 'reason'
  },
  {
    label: '时间',
    prop: 'date'
  },
  {
    label: '操作人',
    prop: 'user'
  },
  {
    label: '备注',
    prop: 'remark'
  }
]

export { Columns, ChangeLogsColumns }
