class TextTickerElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.items = [];
    this.animationId = null;
    this.resizeObserver = null;
    this.lastMeasuredCycleWidth = 0;
    this.resizeTimeout = null;
  }

  static get observedAttributes() {
    return [
      "items",
      "separator",
      "text-color",
      "background-color",
      "speed",
      "google-font",
      "font-family",
      "font-weight",
      "font-size",
    ];
  }

  connectedCallback() {
    this.loadGoogleFont();
    this.render();
    this.updateContent();

    this.resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0 && this.lastMeasuredCycleWidth > 0) {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
          this.updateTickerContent();
        }, 100);
      }
    });
    this.resizeObserver.observe(
      this.shadowRoot.querySelector(".ticker-container")
    );
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "google-font") {
        this.loadGoogleFont();
      }
      if (name === "items") {
        this.updateContent();
      } else {
        this.updateStyles();
        if (
          ["font-family", "font-weight", "font-size", "separator"].includes(
            name
          )
        ) {
          this.updateTickerContent();
        }
      }
    }
  }

  updateContent() {
    const itemsAttr = this.getAttribute("items");

    if (itemsAttr) {
      try {
        const parsed = JSON.parse(itemsAttr);
        if (Array.isArray(parsed)) {
          this.items = parsed.filter((item) => {
            if (typeof item === "string" && item.trim().length > 0) {
              return true;
            }
            if (
              typeof item === "object" &&
              item !== null &&
              typeof item.text === "string" &&
              item.text.trim().length > 0
            ) {
              return true;
            }
            return false;
          });
        } else {
          console.error("Items attribute must be a JSON array");
          this.items = [];
        }
      } catch (error) {
        console.error("Invalid JSON in items attribute:", error);
        this.items = [];
      }
    } else {
      this.items = [];
    }
    this.updateTickerContent();
  }

  loadGoogleFont() {
    const fontName = this.getAttribute("google-font");
    if (!fontName) return;

    const weight = this.getAttribute("font-weight") || "400";
    const existingLink = document.head.querySelector(
      'link[href*="' + fontName.replace(" ", "+") + '"]'
    );

    if (existingLink) return;

    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=" +
      fontName.replace(" ", "+") +
      ":wght@" +
      weight +
      "&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  showMessage(message, color) {
    color = color || "#dc3545";
    const ticker = this.shadowRoot.querySelector(".ticker-content");
    if (ticker) {
      ticker.textContent = message;
      ticker.style.color = color;
      ticker.style.animation = "none";
      ticker.style.transform = "translateX(0)";
      this.lastMeasuredCycleWidth = 0;
    }
  }

  updateTickerContent() {
    const separator = this.getAttribute("separator") || "|";
    const tickerContent = this.shadowRoot.querySelector(".ticker-content");

    if (!tickerContent || this.items.length === 0) {
      this.showMessage("No items to display");
      return;
    }

    const itemsHtml = this.items
      .map((item) => {
        if (typeof item === "string") {
          return (
            '<span class="ticker-item">' + this.escapeHtml(item) + "</span>"
          );
        }

        if (typeof item === "object" && item !== null && item.text) {
          const text = this.escapeHtml(item.text);

          if (item.url) {
            const url = this.escapeHtml(item.url);
            const isExternalLink =
              url.startsWith("http://") || url.startsWith("https://");
            const isMailto = url.startsWith("mailto:");

            let linkAttributes = "";
            if (isExternalLink || isMailto) {
              linkAttributes = 'target="_blank" rel="noopener"';
            }

            return (
              '<a href="' +
              url +
              '" class="ticker-item ticker-link" ' +
              linkAttributes +
              ">" +
              text +
              "</a>"
            );
          } else {
            return '<span class="ticker-item">' + text + "</span>";
          }
        }

        return '<span class="ticker-item">Invalid item</span>';
      })
      .join(
        '<span class="separator">' + this.escapeHtml(separator) + "</span>"
      );

    const fullContent =
      itemsHtml +
      '<span class="separator">' +
      this.escapeHtml(separator) +
      "</span>" +
      itemsHtml +
      '<span class="separator">' +
      this.escapeHtml(separator) +
      "</span>" +
      itemsHtml;
    tickerContent.innerHTML = fullContent;
    tickerContent.style.color = this.getAttribute("text-color") || "#333";

    tickerContent.style.animation = "none";
    tickerContent.style.transform = "translateX(0)";

    requestAnimationFrame(() => {
      this.startAnimation();
    });
  }

  escapeHtml(unsafe) {
    if (typeof unsafe !== "string") {
      return String(unsafe);
    }
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  startAnimation() {
    const container = this.shadowRoot.querySelector(".ticker-container");
    const content = this.shadowRoot.querySelector(".ticker-content");

    if (!container || !content || this.items.length === 0) {
      return;
    }

    const separator = this.getAttribute("separator") || "|";
    const itemsHtml = this.items
      .map((item) => {
        if (typeof item === "string") {
          return (
            '<span class="ticker-item">' + this.escapeHtml(item) + "</span>"
          );
        }
        if (typeof item === "object" && item !== null && item.text) {
          const text = this.escapeHtml(item.text);
          if (item.url) {
            const url = this.escapeHtml(item.url);
            const isExternalLink =
              url.startsWith("http://") || url.startsWith("https://");
            const isMailto = url.startsWith("mailto:");
            let linkAttributes = "";
            if (isExternalLink || isMailto) {
              linkAttributes = 'target="_blank" rel="noopener"';
            }
            return (
              '<a href="' +
              url +
              '" class="ticker-item ticker-link" ' +
              linkAttributes +
              ">" +
              text +
              "</a>"
            );
          } else {
            return '<span class="ticker-item">' + text + "</span>";
          }
        }
        return '<span class="ticker-item">Invalid item</span>';
      })
      .join(
        '<span class="separator">' + this.escapeHtml(separator) + "</span>"
      );

    const tempDiv = document.createElement("div");
    tempDiv.style.cssText =
      "position: absolute; visibility: hidden; white-space: nowrap; font-family: " +
      this.getComputedStyleValue("font-family") +
      "; font-weight: " +
      this.getComputedStyleValue("font-weight") +
      "; font-size: " +
      this.getComputedStyleValue("font-size") +
      "; line-height: 1.4;";
    tempDiv.innerHTML =
      itemsHtml +
      '<span class="separator">' +
      this.escapeHtml(separator) +
      "</span>";

    this.shadowRoot.appendChild(tempDiv);
    const cycleWidth = tempDiv.offsetWidth;
    this.shadowRoot.removeChild(tempDiv);

    if (cycleWidth === 0) {
      console.warn("Cycle width is 0, cannot start animation.");
      return;
    }

    this.lastMeasuredCycleWidth = cycleWidth;

    const speed = Math.max(
      1,
      Math.min(10, parseInt(this.getAttribute("speed")) || 5)
    );
    const duration = cycleWidth / (speed * 25);

    const styleEl = this.shadowRoot.querySelector("style");
    if (styleEl) {
      const keyframes =
        "@keyframes scroll-dynamic { 0% { transform: translateX(0); } 100% { transform: translateX(-" +
        cycleWidth +
        "px); } }";
      const currentStyle = styleEl.textContent;
      const keyframesRegex = /@keyframes scroll-dynamic \{[^}]*\}/s;
      if (keyframesRegex.test(currentStyle)) {
        styleEl.textContent = currentStyle.replace(keyframesRegex, keyframes);
      } else {
        styleEl.textContent += keyframes;
      }
    }

    content.style.animation =
      "scroll-dynamic " + duration + "s linear infinite";
    content.style.transform = "translateX(0)";
  }

  getComputedStyleValue(prop) {
    const content = this.shadowRoot.querySelector(".ticker-content");
    return content ? getComputedStyle(content)[prop] : "";
  }

  updateStyles() {
    const style = this.shadowRoot.querySelector("style");
    if (style) {
      style.textContent = this.getStyles();
    }
  }

  getStyles() {
    const textColor = this.getAttribute("text-color") || "#333";
    const backgroundColor = this.getAttribute("background-color") || "#f8f9fa";
    const googleFont = this.getAttribute("google-font");
    const fontFamily = this.getAttribute("font-family") || "Arial, sans-serif";
    const fontWeight = this.getAttribute("font-weight") || "400";
    const fontSize = this.getAttribute("font-size") || "14px";

    const finalFontFamily = googleFont
      ? '"' + googleFont + '", ' + fontFamily
      : fontFamily;

    return (
      ":host { display: block; width: 100%; overflow: hidden; background-color: " +
      backgroundColor +
      "; padding: 12px 0; box-sizing: border-box; } .ticker-container { white-space: nowrap; overflow: hidden; position: relative; min-height: 1.6em; height: auto; display: flex; align-items: center; } .ticker-content { display: inline-block; font-family: " +
      finalFontFamily +
      "; font-weight: " +
      fontWeight +
      "; font-size: " +
      fontSize +
      "; line-height: 1.4; color: " +
      textColor +
      "; will-change: transform; white-space: nowrap; transform: translateX(0); } .ticker-container:hover .ticker-content { animation-play-state: paused !important; } .ticker-item { color: " +
      textColor +
      "; padding: 0 5px; transition: all 0.2s ease; } .ticker-item:hover { filter: brightness(1.1); background-color: rgba(0, 0, 0, 0.05); } .ticker-link { text-decoration: none; color: inherit; cursor: pointer; } .ticker-link:hover { filter: brightness(1.2); background-color: rgba(0, 0, 0, 0.1); text-decoration: underline; } .separator { color: " +
      textColor +
      "; opacity: 0.7; font-weight: bold; margin: 0 2em; } @media (max-width: 768px) { :host { padding: 8px 0; } .ticker-content { font-size: calc(" +
      fontSize.replace("px", "") +
      " * 0.9px); } .separator { margin: 0 1.5em; } } @media (prefers-reduced-motion: reduce) { .ticker-content { animation: none !important; transform: translateX(0) !important; } }"
    );
  }

  render() {
    this.shadowRoot.innerHTML =
      "<style>" +
      this.getStyles() +
      '</style><div class="ticker-container"><div class="ticker-content">Loading...</div></div>';
  }
}

customElements.define("text-ticker", TextTickerElement);
