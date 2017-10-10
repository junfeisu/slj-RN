import { AppRegistry } from 'react-native';
import slj from './src'

// 禁止警告信息弹出框
console.disableYellowBox = true
// 使用Chrome进行调试
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest

AppRegistry.registerComponent('slj', () => slj);
