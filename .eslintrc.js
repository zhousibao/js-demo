module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  extends: ['standard'],
  rules: {
    // 0允许 1警告 2错误
    "indent": ["error", 2],
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': 0,
    'linebreak-style': 0,
    'no-param-reassign': 0,
    'no-alert': 0,
    'no-tabs': 'off',
    "no-plusplus": 0,
    "no-multiple-empty-lines": [2, {"max": 2}],//空行最多不能超过2行
    "no-mixed-operators": 0, // 循序混合运算
    "eqeqeq": [2, "allow-null"], // 使用 === 替代 ==  

    // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [2, "always-multiline"],
    // 控制逗号前后的空格
    "comma-spacing": [2, { "before": false, "after": true }],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],

    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers':0,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-prototype-builtins':0
  },
};