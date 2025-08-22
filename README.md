# Text Ticker Web Component

A scrolling text ticker web component with clickable links, Google Fonts support, and customizable styling including separator color control.

## Installation

Add the script to your HTML:
```html
<script src="https://raw.githack.com/DevManSam777/text-ticker/main/text-ticker.js"></script>
```

## Basic Usage

```html
<text-ticker items='["Breaking News", "Weather Update", "Sports Score"]'></text-ticker>
```

## Content Types

### Text Only
```html
<text-ticker items='["Simple text", "Another item", "More news"]'></text-ticker>
```

### With Clickable Links
Use objects with `text` and `url` properties:
```html
<text-ticker items='["Regular text", {"text": "Click here", "url": "https://example.com"}, "More text"]'></text-ticker>
```

## The Quotation marks & apostrophes

HTML attributes have strict rules about quotes.

### Text with Quotes or Apostrophes
If your text contains quotes (`"`) or apostrophes (`'`), you MUST:
1. Use **double quotes** for the HTML attribute
2. Replace all quotes and apostrophes with HTML entities

```html
<!-- ✅ WORKS - Using HTML entities -->
<text-ticker items="[&quot;It's working&quot;, &quot;He said \&quot;Hello\&quot;&quot;, &quot;Don't worry&quot;]"></text-ticker>
```

### HTML Entity Replacements
- Replace `'` with `&apos;`
- Replace `"` with `&quot;`
- For quotes inside quotes, use `\&quot;`

### What Will Break Your Component
```html
<!-- ❌ BROKEN - Browser stops reading at first apostrophe -->
<text-ticker items='["It's broken", "Don't work"]'></text-ticker>

<!-- ❌ BROKEN - Will cause JSON errors -->
<text-ticker items='["He said "Hello"", "Weather"]'></text-ticker>
```

### Links with Quotes/Apostrophes
For clickable links with quotes or apostrophes:
```html
<!-- ✅ WORKS - All quotes escaped -->
<text-ticker items="[{&quot;text&quot;: &quot;Today's news&quot;, &quot;url&quot;: &quot;https://news.com&quot;}, &quot;He said \&quot;Hello\&quot;&quot;]"></text-ticker>
```

## Link Types

### External Links (open in new tab)
```html
<text-ticker items="[{&quot;text&quot;: &quot;Visit Google&quot;, &quot;url&quot;: &quot;https://google.com&quot;}]"></text-ticker>
<text-ticker items="[{&quot;text&quot;: &quot;Read article&quot;, &quot;url&quot;: &quot;http://news.com/story&quot;}]"></text-ticker>
```

### Internal Page Links (same tab)
```html
<text-ticker items="[{&quot;text&quot;: &quot;Go to section&quot;, &quot;url&quot;: &quot;#about&quot;}]"></text-ticker>
<text-ticker items="[{&quot;text&quot;: &quot;View page&quot;, &quot;url&quot;: &quot;/contact&quot;}]"></text-ticker>
```

### Email Links
```html
<text-ticker items="[{&quot;text&quot;: &quot;Send email&quot;, &quot;url&quot;: &quot;mailto:contact@example.com&quot;}]"></text-ticker>
<text-ticker items="[{&quot;text&quot;: &quot;Support&quot;, &quot;url&quot;: &quot;mailto:help@company.com?subject=Help&quot;}]"></text-ticker>
```

### Phone Links
```html
<text-ticker items="[{&quot;text&quot;: &quot;Call us&quot;, &quot;url&quot;: &quot;tel:+1234567890&quot;}]"></text-ticker>
```

## Attributes

| Attribute | Default | Description | Example |
|-----------|---------|-------------|---------|
| `items` | `[]` | JSON array of strings or link objects | `'["Item 1", "Item 2"]'` |
| `speed` | `5` | Animation speed (1-10, higher = faster) | `"7"` |
| `separator` | `"|"` | Character between items | `"•"`, `"★"`, `"—"` |
| `separator-color` | `text-color` | Color of separator characters | `"#ff0000"`, `"blue"` |
| `font-size` | `"14px"` | Text size | `"18px"`, `"1.2rem"` |
| `font-weight` | `"400"` | Font weight | `"600"`, `"bold"` |
| `font-family` | `"Arial, sans-serif"` | Font family | `"Georgia, serif"` |
| `google-font` | - | Google Font name (auto-loads) | `"Inter"`, `"Roboto"` |
| `text-color` | `"#333"` | Text color | `"#ff6600"`, `"blue"` |
| `background-color` | `"#f8f9fa"` | Background color | `"#ffffff"`, `"transparent"` |

## Complete Examples

### News Ticker
```html
<text-ticker 
    items='["Breaking: Stock market up 3%", {"text": "Read story", "url": "https://reuters.com"}, "Weather: Sunny, 75°F"]'
    speed="4"
    separator="★"
    separator-color="#ff6600"
    google-font="Roboto"
    text-color="#000"
    background-color="#ffeb3b">
</text-ticker>
```

### E-commerce with Quotes
```html
<text-ticker 
    items="[&quot;🎉 Today's special offer!&quot;, {&quot;text&quot;: &quot;Shop now&quot;, &quot;url&quot;: &quot;https://store.com&quot;}, &quot;Free shipping on orders over $50&quot;]"
    speed="6"
    separator="—"
    separator-color="#ffff00"
    font-size="18px"
    text-color="#fff"
    background-color="#e91e63">
</text-ticker>
```

### Restaurant Menu
```html
<text-ticker 
    items="[&quot;Today's special: Grilled salmon - $24.99&quot;, {&quot;text&quot;: &quot;Make reservation&quot;, &quot;url&quot;: &quot;tel:+1234567890&quot;}, &quot;Fresh pasta - $18.50&quot;]"
    speed="3"
    separator="★"
    separator-color="#d4a574"
    google-font="Playfair Display"
    text-color="#8b4513"
    background-color="#fff8dc">
</text-ticker>
```

## Google Fonts

Automatically loads fonts from Google Fonts:
```html
<text-ticker google-font="Inter" font-weight="600" items='["Modern typography"]'></text-ticker>
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

[MIT](LICENSE)

Copyright (c) 2025 DevManSam