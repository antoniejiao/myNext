export class Dictionary {
  key: number;
  value: string;
};

export const YESORNO: Dictionary[] = [
      {'key':1, 'value': '是'},
      {'key':2, 'value': '否'}
];

export const WASTAGETYPES: Dictionary[] = [
      {'key':1, 'value': '搬运损耗'},
      {'key':2, 'value': '库损'},
      {'key':3, 'value': '其他'}
];

export const SPACETYPES: Dictionary[] = [
      {'key':1, 'value':'备货区'},
      {'key':2, 'value':'出货区'},
      {'key':3, 'value':'组装区'},
      {'key':4, 'value':'打包区'},
      {'key':5, 'value':'物流区'},
      {'key':6, 'value':'调拨区'},
      {'key':7, 'value':'配件区'}
];

export const STATUSARRAYS: Dictionary[] = [
      {'key':1, 'value':'启用'},
      {'key':2, 'value':'停用'},
      {'key':3, 'value':'废弃'}
];

export const TEMPERATURETYPES: Dictionary[] = [
      {'key':1, 'value':'冷冻'},
      {'key':2, 'value':'冷藏'},
      {'key':3, 'value':'常温'}
];

export const SHELFLOCATIONTYPES: Dictionary[] = [
      {'key':1, 'value': '一个货位/格'},
      {'key':2, 'value': '一个货位/货架'},
      {'key':3, 'value': '一个货位/层'},
      {'key':4, 'value': '一个货位/列'}
];

export const CHECKSTATUSARRAYS: Dictionary[] = [
      {'key':0, 'value': '取消'},
      {'key':1, 'value': '盘点中'},
      {'key':2, 'value': '暂停'},
      {'key':3, 'value': '完成'}
];
