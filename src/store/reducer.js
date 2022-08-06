// 定义一个默认状态
const defaultState = {
    myKey: 1
}
// 导出一个函数
// eslint-disable-next-line
export default (state = defaultState, actions) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (actions.type) {
        case 'addKeyFn':
            newState.myKey++
            break
        default:
            break;
    }
    return newState
}