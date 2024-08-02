# Customization

Some aspects of the Web Components provided by this library can be customized:

- Color: Can be overwritten by setting the property `color` of any element. Otherwise, default colors will be chosen.
- Font family: Inline text components automatically use the font of their surrounding text. Other components use default
  fonts, which can be overwritten with CSS variables.

## Available CSS variables

| CSS Variable   | default       |
|----------------|---------------|
| `--font-sans`  | `Roboto`      |
| `--font-serif` | `Noto Serif`  |
| `--font-mono`  | `Roboto Mono` |

## Example

<!-- tabs:start -->

#### **Result**

[](../examples/customization/index.html ':include')

#### **HTML**

[](../examples/customization/index.html ':include :type=code html')

<!-- tabs:end -->