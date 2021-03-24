// 主要匹配结果：/..
// const reg = /(?:^|\/)\.?\.$/;
console.log('..'.match(/(^|\/)\./));
// 1. \.?: 0个或一个a
// 2. \.$: 匹配结尾的点
// 3. ?: : 匹配不补获
// 4. ^ : 字符串的开始位置
// 5. (^|\/)\.: 以.开头，或者匹配带有/.的字符串

// 通过regex101.com来进行正则的调试，可以将鼠标移入展示对应匹配规则
// test demo: https://regex101.com/
