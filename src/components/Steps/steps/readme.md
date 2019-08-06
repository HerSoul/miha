# mi-steps



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                         | Type                                         | Default        |
| ---------------- | ----------------- | --------------------------------------------------- | -------------------------------------------- | -------------- |
| `classNames`     | `class-names`     | 步骤条类名                                               | `string`                                     | `undefined`    |
| `current`        | `current`         | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态      | `number`                                     | `0`            |
| `direction`      | `direction`       | 指定步骤条方向。目前支持水平（horizontal）和竖直（vertical）两种方向         | `"horizontal" \| "vertical"`                 | `'horizontal'` |
| `initial`        | `initial`         | 起始序号，从 0 开始记数                                       | `number`                                     | `0`            |
| `labelPlacement` | `label-placement` | 指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方                | `"horizontal" \| "vertical"`                 | `'horizontal'` |
| `onChanges`      | --                | 点击切换步骤时触发                                           | `(number: any) => void`                      | `()=>{}`       |
| `progressDot`    | --                | 点状步骤条，可以设置为一个 function，labelPlacement 将强制为 vertical | `Boolean \| Function`                        | `false`        |
| `size`           | `size`            | 指定大小，目前支持普通（default）和迷你（small)                      | `"default" \| "small"`                       | `'default'`    |
| `status`         | `status`          | 指定当前步骤的状态，可选 wait process finish error              | `"error" \| "finish" \| "process" \| "wait"` | `'process'`    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
