import RegExp from '@/utils/RegExp'

const Columns = [
  {
    label: '姓名',
    prop: 'name',
    fixed: true,
    addtype: 'text',
    placeholder: '2-10个汉字',
    required: true
  },
  {
    label: '性别',
    prop: 'gender',
    isFilter: true,
    options: [{ label: '男' }, { label: '女' }],
    addtype: 'select',
    required: true
  },
  {
    label: '联系方式',
    prop: 'phone',
    isDefaultShow: true,
    addtype: 'text'
  },
  {
    label: '身份证号',
    prop: 'idCardNo',
    isDefaultShow: true,
    addtype: 'text',
    required: true
  },

  {
    label: '组别',
    prop: 'groupName',
    isDefaultShow: true,
    isFilter: true,
    isMutiple: true,
    options: [
      { label: '一组' },
      { label: '二组' },
      { label: '三组' },
      { label: '四组' },
      { label: '五组' },
      { label: '六组' },
      { label: '七组' },
      { label: '八组' }
    ],
    addtype: 'select',
    required: true
  },

  {
    label: '民族',
    prop: 'nation',
    isFilter: true,
    options: [{ label: '汉族' }, { label: '非汉族' }],
    addtype: 'select',
    required: true
  },
  {
    label: '学历',
    prop: 'education',
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
    ],
    addtype: 'select',
    required: true
  },
  {
    label: '宗教信仰',
    prop: 'religion',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '无' }, { label: '基督教' }, { label: '佛教' }, { label: '伊斯兰教' }, { label: '其它' }],
    addtype: 'select',
    required: true
  },
  {
    label: '参保情况',
    prop: 'insurance',
    isFilter: true,
    options: [{ label: '新农合' }, { label: '城镇居民医保' }],
    addtype: 'select',
    required: true
  },
  {
    label: '出生日期',
    prop: 'birthday',
    isFilter: true,
    type: 'daterange',
    addtype: 'date',
    required: true
  },
  {
    label: '是否独生子女',
    prop: 'isOnlyChild',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },
  {
    label: '兵役情况',
    prop: 'military',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },
  {
    label: '政治面貌',
    prop: 'politicalStatus',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '中共党员' }, { label: '共青团员' }, { label: '群众' }],
    addtype: 'select',
    required: true
  },
  {
    label: '婚姻状况',
    prop: 'marriage',
    isFilter: true,
    isMutiple: true,
    options: [{ label: '未婚' }, { label: '已婚' }, { label: '丧偶' }, { label: '离异' }],
    addtype: 'select',
    required: true
  },
  {
    label: '职业',
    prop: 'wordType',
    addtype: 'text'
  },
  {
    label: '户籍地址',
    prop: 'residenceAddress',
    addtype: 'textarea',
    required: true
  },
  {
    label: '居住地址',
    prop: 'residentialAddress',
    addtype: 'textarea',
    required: true
  },
  {
    label: '户号',
    prop: 'hhRegistryNo',
    addtype: 'text',
    required: true
  },
  {
    label: '户主',
    prop: 'houseHolderName',
    isDefaultShow: true,
    addtype: 'text',
    required: true
  },
  {
    label: '与户主关系',
    prop: 'hhRelation',
    isDefaultShow: true,
    options: [
      { label: '本人' },
      { label: '配偶、' },
      { label: '子' },
      { label: '女' },
      { label: '(外)孙子女' },
      { label: '父' },
      { label: '母' },
      { label: '兄弟姐妹' },
      { label: '重孙子女' },
      { label: '儿媳' },
      { label: '女婿' }
    ],
    addtype: 'select',
    required: true
  },
  {
    label: '是否贫困家庭',
    prop: 'isPoverty',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },
  {
    label: '是否低保',
    prop: 'isLowIncome',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },
  {
    label: '是否五保',
    prop: 'isFiveGuarantee',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },

  {
    label: '是否军属家庭',
    prop: 'isMilitaryFamily',
    isFilter: true,
    options: [{ label: '是' }, { label: '否' }],
    addtype: 'select',
    required: true
  },

  {
    label: '家庭年收入',
    prop: 'familyIncome',
    isFilter: true,
    type: 'numrange',
    addtype: 'text',
    required: true
  },
  {
    label: '耕地面积(亩)',
    prop: 'farmlandMu',
    isFilter: true,
    type: 'numrange',
    addtype: 'text',
    required: true
  },
  // {
  //   label: '耕地备注',
  //   prop: 'farmlandRemark',
  //   isFilter: true,
  //   type: 'numrange',
  //   addtype: 'textarea',
  //   placeholder: '至多200字'
  // },

  {
    label: '是否迁入',
    prop: 'isMoveIn',
    addtype: 'select',
    options: [{ label: '是' }, { label: '否' }]
  },
  {
    label: '迁入原因',
    prop: 'moveInReason',
    addtype: 'select',
    options: [{ label: '嫁娶' }, { label: '收留' }]
  },
  // {
  //   label: '迁入备注',
  //   prop: 'moveInRemark',
  //   addtype: 'textarea'
  // },
  {
    label: '备注',
    prop: 'remark',
    addtype: 'textarea'
  }
]

const ChangeLogsColumns = [
  {
    label: '姓名',
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

const addlogItems = [
  {
    label: '身份证正面',
    prop: 'idCardFront'
  },
  {
    label: '身份证反面',
    prop: 'idCardBack'
  },
  {
    label: '户口本本人页',
    prop: 'hhRegistrySelf'
  },
  {
    label: '户口本户主页',
    prop: 'hhRegistryMaster'
  }
]

export { Columns, ChangeLogsColumns, addlogItems }
