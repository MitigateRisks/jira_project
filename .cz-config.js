module.exports = {
  //可选类型
  types: [
    { value: 'feat', name: 'feat:  新功能、新特性' },
    { value: 'fix', name: 'fix:    修改bug' },
    { value: 'docs', name: 'docs:   文档修改' },
    { value: 'style', name: 'style:   代码格式修改，注意不是 css 修改 (例如分号修改)' },
    { value: 'ci', name: 'ci:   持续集成相关文件修改' },
    { value: 'workflow', name: 'workflow:   工作流相关文件修改' },
    {
      value: 'refactor',
      name: 'refactor:   代码重构(重构，在不影响代码内部行为、功能下的代码修改)'
    },
    { value: 'pref', name: 'pref:   更改代码提升性能(在不影响代码内部行为的前提下，对程序性能进行优化)' },
    { value: 'test', name: 'test:   测试用例新增、修改' },
    { value: 'chore', name: 'chore:   其他修改(不在上述类型中的修改)' },
    { value: 'revert', name: 'revert:   恢复上一次提交' },
    { value: 'build', name: 'build:   影响项目构建或依赖项修改' },
  ],
  //步骤
  messages: {
    type: '请选择提交的类型',
    customScope: '请输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issue(可选)',
    confirmCommit: '请 确认使用以上信息提交?(y/n)'
  },
  //跳过步骤
  skipQuestions: ['body', 'footer'],
  //设置长度限制 默认为72
  subjectLimit: 72
}