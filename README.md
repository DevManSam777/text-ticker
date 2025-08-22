# Text Ticker Web Component

A scrolling text ticker web component with clickable links, Google Fonts support, and customizable styling including separator color control.

![Ticker Gif](./ticker.gif)

## Installation

Add the script to your HTML:

```html
<script src="text-ticker.js"></script>
```

## Basic Usage

```html
<text-ticker
  items='["Breaking News", "Weather Update", "Sports Score"]'
></text-ticker>
```

## Content Types

### Text Only

```html
<text-ticker items='["Simple text", "Another item", "More news"]'></text-ticker>
```

### With Clickable Links

Use objects with `text` and `url` properties:

```html
<text-ticker
  items='["Regular text", {"text": "Click here", "url": "https://example.com"}, "More text"]'
></text-ticker>
```

### Mixed Content

```html
<text-ticker
  items='["Breaking news", {"text": "Read more", "url": "https://news.com"}, "Weather update", {"text": "Contact us", "url": "mailto:info@example.com"}]'
></text-ticker>
```

## Link Types

### External Links (open in new tab)

```html
{&quot;text&quot;: &quot;Visit Google&quot;, &quot;url&quot;:
&quot;https://google.com&quot;} {&quot;text&quot;: &quot;Read article&quot;,
&quot;url&quot;: &quot;http://news.com/story&quot;}
```

### Internal Page Links (same tab)

```html
{&quot;text&quot;: &quot;Go to section&quot;, &quot;url&quot;:
&quot;#about&quot;} {&quot;text&quot;: &quot;View page&quot;, &quot;url&quot;:
&quot;/contact&quot;}
```

### Email Links (open email client)

```html
{&quot;text&quot;: &quot;Send email&quot;, &quot;url&quot;:
&quot;mailto:contact@example.com&quot;} {&quot;text&quot;: &quot;Support&quot;,
&quot;url&quot;: &quot;mailto:help@company.com?subject=Help&quot;}
```

### Phone Links

```html
{&quot;text&quot;: &quot;Call us&quot;, &quot;url&quot;:
&quot;tel:+1234567890&quot;}
```

## Quotes and Special Characters

**Simple text (no quotes):** Use single quotes for HTML attribute

```html
<text-ticker items='["News", "Weather", "Sports"]'></text-ticker>
```

**Text with quotes/apostrophes:** Use double quotes for HTML attribute + HTML entities

```html
<text-ticker items='["It&apos;s sunny", "He said \"Hello\""]'></text-ticker>
```

**Links with quotes/apostrophes:** Use HTML entities throughout

```html
<text-ticker
  items='[{"text": "Today&apos;s news", "url": "https://news.com"}, "Weather: \"Sunny\""]'
></text-ticker>
```

**HTML Entity Reference:**

- `&quot;` = double quote (`"`)
- `&apos;` = apostrophe (`'`)
- `\&quot;` = escaped quote inside strings

## Attributes

| Attribute          | Default               | Description                             | Example                      |
| ------------------ | --------------------- | --------------------------------------- | ---------------------------- | ------------------- |
| `items`            | `[]`                  | JSON array of strings or link objects   | `'["Item 1", "Item 2"]'`     |
| `speed`            | `5`                   | Animation speed (1-10, higher = faster) | `"7"`                        |
| `separator`        | `"                    | "`                                      | Character between items      | `"•"`, `"★"`, `"—"` |
| `separator-color`  | `text-color`          | Color of separator characters           | `"#ff0000"`, `"blue"`        |
| `font-size`        | `"14px"`              | Text size                               | `"18px"`, `"1.2rem"`         |
| `font-weight`      | `"400"`               | Font weight                             | `"600"`, `"bold"`            |
| `font-family`      | `"Arial, sans-serif"` | Font family                             | `"Georgia, serif"`           |
| `google-font`      | -                     | Google Font name (auto-loads)           | `"Inter"`, `"Roboto"`        |
| `text-color`       | `"#333"`              | Text color                              | `"#ff6600"`, `"blue"`        |
| `background-color` | `"#f8f9fa"`           | Background color                        | `"#ffffff"`, `"transparent"` |

## Separator Color Examples

### Default (same as text)

```html
<text-ticker
  items='["News", "Weather", "Sports"]'
  text-color="#333"
></text-ticker>
```

### Custom separator color

```html
<text-ticker
  items='["News", "Weather", "Sports"]'
  text-color="#333"
  separator-color="#ff0000"
  separator="•"
>
</text-ticker>
```

### Different separator styles

```html
<!-- Red separators with blue text -->
<text-ticker
  items='["Item 1", "Item 2", "Item 3"]'
  text-color="#0066cc"
  separator-color="#ff0000"
  separator="★"
>
</text-ticker>

<!-- Gray separators with black text -->
<text-ticker
  items='["Item 1", "Item 2", "Item 3"]'
  text-color="#000000"
  separator-color="#999999"
  separator="—"
>
</text-ticker>
```

## Complete Examples

### News Ticker with Custom Separator Color

```html
<text-ticker
  items='["Breaking: Stock market up 3%", {"text": "Read full story", "url": "https://reuters.com"}, {"text": "See analysis", "url": "#analysis"}, "Weather: Sunny, 75°F"]'
  speed="4"
  separator="★"
  separator-color="#ff6600"
  google-font="Roboto"
  text-color="#000"
  background-color="#ffeb3b"
>
</text-ticker>
```

### E-commerce with Colorful Separators

```html
<text-ticker
  items='["🎉 50% off everything!", {"text": "Shop now", "url": "https://store.com"}, "Free shipping today", {"text": "Contact support", "url": "mailto:help@store.com"}]'
  speed="6"
  separator="—"
  separator-color="#ffff00"
  font-size="18px"
  text-color="#fff"
  background-color="#e91e63"
>
</text-ticker>
```

### Restaurant Menu with Subtle Separators

```html
<text-ticker
  items='["Today&apos;s special: Grilled salmon - $24.99", {"text": "Make reservation", "url": "tel:+1234567890"}, "Fresh pasta - $18.50", {"text": "View full menu", "url": "#menu"}]'
  speed="3"
  separator="★"
  separator-color="#d4a574"
  google-font="Playfair Display"
  text-color="#8b4513"
  background-color="#fff8dc"
>
</text-ticker>
```

### Financial Ticker with Accent Separators

```html
<text-ticker
  items='["AAPL: $150.25 (+2.3%)", "TSLA: $890.50 (-1.2%)", "BTC: $67,000 (+5.8%)"]'
  speed="7"
  separator="•"
  separator-color="#00ff00"
  font-size="14px"
  google-font="Roboto"
  font-weight="500"
  text-color="#ffffff"
  background-color="#1976d2"
>
</text-ticker>
```

## Google Fonts

Automatically loads fonts from Google Fonts:

```html
<text-ticker
  google-font="Inter"
  font-weight="600"
  items='["Modern typography"]'
></text-ticker>
```

**Popular fonts:** Inter, Roboto, Playfair Display, Montserrat, Open Sans

## Link Behavior

- **External links** (`https://`, `http://`): Open in new tab with `target="_blank" rel="noopener"`
- **Email links** (`mailto:`): Open in email client, new tab
- **Internal links** (`#section`, `/page`): Navigate in same tab
- **Phone links** (`tel:`): Open phone dialer

## Features

- Infinite scrolling animation
- Hover to pause
- Ticker size dynamically adjusts to font-size
- Clickable links with smart target behavior
- Google Fonts auto-loading
- Separate separator color control
- Mobile responsive
- Respects `prefers-reduced-motion`
- Performance optimized

## Troubleshooting

**Links not clickable:** Use HTML entities for objects with quotes
**Text cut off:** Use `&quot;` and `&apos;` for special characters
**JSON errors:** Check syntax and escaping
**Animation issues:** Adjust speed (1-10) or check container width
**Separator color not showing:** Ensure valid CSS color value

## License

[MIT](License)

Copyright (c) 2025 DevManSam
