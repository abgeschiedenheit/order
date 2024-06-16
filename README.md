# order (WIP)

Prettier plugin for property ordering – meaning, grouping by behaviour: font, shape, style, et cetera. It makes for easier reading.

Credit to [Jacob and, particularly, Lochie](https://nitter.poast.org/jcb/status/1798094424775242203#m) for the idea.

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

After:

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