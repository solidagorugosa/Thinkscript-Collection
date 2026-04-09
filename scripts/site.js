const indicators = [
  {
    id: "830_Data_TradeModel",
    title: "830_Data_TradeModel",
    script: "scripts/indicators/830_Data_TradeModel.thinkscript",
    images: ["images/DATA830_TRADEMODEL.JPG"],
    description:
      "Anchors the 8:30 EST data-release range and projects ADR-based targets for event-driven futures sessions."
  },
  {
    id: "AverageRangeDraw_lite",
    title: "AverageRangeDraw_lite",
    script: "scripts/indicators/AverageRangeDraw_lite.thinkscript",
    images: ["images/avgrange_drawlite.JPG"],
    description:
      "Calculates average daily range and overlays projected levels from the daily high, low, and open."
  },
  {
    id: "Earnings_Breakout",
    title: "Earnings_Breakout",
    script: "scripts/indicators/Earnings_Breakout.thinkscript",
    images: ["images/EARNINGS_Breakout.JPG", "images/EARNINGS_RANGE.JPG"],
    description:
      "Highlights post-earnings gap direction, tracks the earnings reaction range, and marks the first breakout from that zone."
  },
  {
    id: "FirstNY_FVG",
    title: "FirstNY_FVG",
    script: "scripts/indicators/FirstNY_FVG.thinkscript",
    images: ["images/FirstNY_FVG.JPG"],
    description:
      "Identifies the first fair value gap after the New York open and extends the zone for follow-through analysis."
  },
  {
    id: "GapDistance_Threshold",
    title: "GapDistance_Threshold",
    script: "scripts/indicators/GapDistance_Threshold.thinkscript",
    images: ["images/GapDistance_Threshhold.JPG"],
    description:
      "Displays prior-close to current-open gap values and flags threshold-sized gaps with directional chevrons."
  },
  {
    id: "Leadership_Detection",
    title: "Leadership_Detection",
    script: "scripts/indicators/Leadership_Detection.thinkscript",
    images: ["images/leadership_detection.JPG"],
    description:
      "Compares NQ, ES, and YM against their average ranges and colors price by the current market leader."
  },
  {
    id: "NetVolume_NQ",
    title: "NetVolume_NQ",
    script: "scripts/indicators/NetVolume_NQ.thinkscript",
    images: ["images/NetVolume_NQ.JPG"],
    description:
      "Combines traded volume from NQ-linked instruments to show participation and possible capitulatory spikes."
  },
  {
    id: "RangeBars_v4",
    title: "RangeBars_v4",
    script: "scripts/indicators/RangeBars_v4.thinkscript",
    images: ["images/RangebarsV4.JPG"],
    description:
      "Shows candle range histograms, moving-average bands, and threshold-based label counts for expansion analysis."
  },
  {
    id: "Tick_Replot",
    title: "Tick_Replot",
    script: "scripts/indicators/Tick_Replot.thinkscript",
    images: ["images/Tick_Replot.JPG"],
    description:
      "Replots $TICK with cleaner clouds, a zero line, and threshold markers for intraday breadth context."
  },
  {
    id: "drawdown-from-all-time-high",
    title: "Drawdown From All Time High",
    script: "scripts/indicators/drawdown-from-all-time-high.thinkscript",
    images: ["images/ATH DRAWdown.JPG"],
    description:
      "Plots the percentage decline from the running all-time high and labels both current and maximum drawdown."
  },
  {
    id: "vx_comp",
    title: "vx_comp",
    script: "scripts/indicators/vx_comp.thinkscript",
    images: ["images/VX_comp.JPG"],
    description:
      "Overlays the VX futures curve to spot contango and backwardation shifts across the volatility term structure."
  }
];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIndicatorUrl(id) {
  return `indicator.html?id=${encodeURIComponent(id)}`;
}

function renderIndex() {
  const grid = document.getElementById("indicator-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = indicators
    .map((item) => {
      const preview = item.images[0];
      return `
        <article class="card">
          <img class="card-image" src="${encodeURI(preview)}" alt="${escapeHtml(item.title)} chart preview" loading="lazy" />
          <div class="card-body">
            <span class="tag">Indicator</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <p><strong>Script:</strong> <code>${escapeHtml(item.script)}</code></p>
            <div class="card-actions">
              <a class="button-link" href="${getIndicatorUrl(item.id)}">Open indicator page</a>
              <a class="text-link" href="${item.script}">Raw script</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDetail() {
  const titleEl = document.getElementById("indicator-title");
  if (!titleEl) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const item = indicators.find((entry) => entry.id === id);

  if (!item) {
    titleEl.textContent = "Indicator not found";
    const descriptionEl = document.getElementById("indicator-description");
    const galleryEl = document.getElementById("indicator-gallery");
    if (descriptionEl) {
      descriptionEl.textContent = "Return to the index and choose an available indicator card.";
    }
    if (galleryEl) {
      galleryEl.innerHTML = '<p class="empty-state">No matching indicator was found for this link.</p>';
    }
    return;
  }

  document.title = `${item.title} | ThinkScript Collection`;

  const descriptionEl = document.getElementById("indicator-description");
  const galleryEl = document.getElementById("indicator-gallery");
  const scriptLink = document.getElementById("script-link");
  const scriptPath = document.getElementById("script-path");
  const frame = document.getElementById("script-frame");

  titleEl.textContent = item.title;
  if (descriptionEl) {
    descriptionEl.textContent = item.description;
  }

  if (galleryEl) {
    galleryEl.innerHTML = item.images
      .map(
        (image, index) => `
          <figure class="detail-figure">
            <img src="${encodeURI(image)}" alt="${escapeHtml(item.title)} chart preview ${index + 1}" loading="eager" />
            <figcaption>${item.images.length > 1 ? `Chart preview ${index + 1}` : "Chart preview"}</figcaption>
          </figure>
        `
      )
      .join("");
  }

  if (scriptLink) {
    scriptLink.href = item.script;
  }

  if (scriptPath) {
    scriptPath.textContent = item.script;
  }

  if (frame) {
    frame.src = item.script;
    frame.title = `${item.title} source`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderIndex();
  renderDetail();
});
