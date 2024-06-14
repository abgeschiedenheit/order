# order (WIP)

Prettier plugin for property ordering – meaning, grouping by behaviour: font, shape, style, et cetera.

Credit to [Jacob and Lochie](https://nitter.poast.org/jcb/status/1798094424775242203#m).

## example

Before:

```css
button {
  display: inline-block;
  padding: 12px 16px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 2px;
  font-size: 12px;
  text-align: center;
}
```

After (one variation):

```css
button {
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;

  padding: 12px 16px;
  border-radius: 2px;

  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
```