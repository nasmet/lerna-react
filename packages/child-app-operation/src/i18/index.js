/*
 * @Description: 国际化控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-23 12:55:19
 * @LastEditTime: 2021-10-08 14:22:40
 */

const languageConfig = {
  'zh-cn': {
    'operation.account': '账号',
    'operation.tips': '温馨提示',
    'operation.nickName': '昵称',
    'operation.hideMoney': '藏钱金额',
    'operation.findMoney': '找钱金额',
    'operation.freezeMoney': '冻结金额',
    'operation.withdrawnMoney': '已提现金额',
    'operation.confirmDeletion': '确认删除?',
    'operation.confirm': '确认',
    'operation.cancel': '取消',
    'operation.successfullyDeleted': '删除成功',
    'operation.operate': '操作',
    'operation.edit': '编辑',
    'operation.delete': '删除',
    'operation.user': '用户',
    'operation.list': '列表',
    'operation.createTime': '创建时间',
  },
  en: {
    'operation.account': 'account',
    'operation.tips': 'tips',
    'operation.nickName': 'nick name',
    'operation.hideMoney': 'hide money',
    'operation.findMoney': 'find money',
    'operation.freezeMoney': 'freeze money',
    'operation.withdrawnMoney': 'withdrawn money',
    'operation.confirmDeletion': 'confirm deletion?',
    'operation.confirm': 'confirm',
    'operation.cancel': 'cancel',
    'operation.successfullyDeleted': 'successfully deleted',
    'operation.operate': 'operate',
    'operation.edit': 'edit',
    'operation.delete': 'delete',
    'operation.user': 'user',
    'operation.list': 'list',
    'operation.createTime': 'creation time',
  },
};

window.i18Ctrl.getI18().setLanguage('zh-cn', languageConfig['zh-cn']);
window.i18Ctrl.getI18().setLanguage('en', languageConfig['en']);
window.i18Ctrl.initLanguage();

function formatterMessage(key, prefix = 'operation.') {
  return window.i18Ctrl.formatterMessage(key, prefix);
}

export { formatterMessage };
