import pjson from "../package.json";

function usage() {
  console.groupCollapsed(
    `%c === %cLovelace WBAH ${pjson.version}%c ===%c`,
    "font-weight: bold",
    "color: green; font-weight: bold",
    "font-weight: bold",
    ""
  );
  console.info(
    `You have Lovelace WBAH installed, that will add some functionality to your frontend`
  );

  console.group(
    `%cExtended Variables and functions in global scope: %c`,
    "font-weight: bold",
    ""
  );
  console.table({
    "window.hass": "hass object",
    "window.lovelace": "lovelace object",
    "window.view": "View root element",
    "window.editMode()": "Enable GUI editing mode (sandbox only in yaml mode)",
    "window.rtl()": "Toggle language RTL",
  });
  console.groupEnd();

  console.group(
    `%cExtended Quick launch commands (press c): %c`,
    "font-weight: bold",
    ""
  );
  console.table({
    "GUI Edit mode": "Enable GUI editing mode (sandbox only in yaml mode)",
    "RTL mode": "Toggle language RTL",
  });
  console.groupEnd();

  console.group(
    `%cExtended Quick launch entities (press e): %c`,
    "font-weight: bold",
    ""
  );
  console.info(`Shift+Enter will toggle entities is possible`);
  console.groupEnd();

  console.groupEnd();
}

function wbah() {
  if ((window as any).wbah) return;

  (window as any).wbah = true;

  const getHass = () => {
    return (document.querySelector("home-assistant") as any).hass;
  };

  const getLovelace = () => {
    let root: any = document.querySelector("home-assistant");
    root = root && root.shadowRoot;
    root = root && root.querySelector("home-assistant-main");
    root = root && root.shadowRoot;
    root =
      root && root.querySelector("app-drawer-layout partial-panel-resolver");
    root = (root && root.shadowRoot) || root;
    root = root && root.querySelector("ha-panel-lovelace");
    root = root && root.shadowRoot;
    root = root && root.querySelector("hui-root");
    return root;
  };

  Object.defineProperty(window, "hass", {
    get: () => {
      return getHass();
    },
  });

  Object.defineProperty(window, "lovelace", {
    get: () => {
      const ll = getLovelace();
      if (ll) return (ll as any).lovelace;
    },
  });

  Object.defineProperty(window, "view", {
    get: () => {
      let root = getLovelace();
      root = root && root.shadowRoot;
      root = root && root.querySelector("ha-app-layout");
      root = root && root.querySelector("#view");
      root = root && root.firstElementChild;
      return root;
    },
  });

  (window as any).editMode = () => {
    const ll = getLovelace();
    if (!ll) return;
    ll.lovelace.setEditMode(!ll.lovelace.editMode);
  };

  (window as any).rtl = () => {
    const hass = getHass();
    const lang = hass.locale?.language || "en";

    const rootEl = document.querySelector("home-assistant") as any;

    hass.translationMetadata.translations[lang].isRTL =
      !hass.translationMetadata.translations[lang].isRTL;
    hass.language = "abc";
    rootEl.hassChanged(hass, hass);

    rootEl.dispatchEvent(
      new CustomEvent("hass-language-select", { detail: lang })
    );
  };

  customElements.whenDefined("ha-quick-bar").then(() => {
    const HaQuickBar = customElements.get("ha-quick-bar");

    const __handleInputKeyDown = HaQuickBar.prototype._handleInputKeyDown;
    HaQuickBar.prototype._handleInputKeyDown = function (ev) {
      if (ev.code === "Enter" && ev.shiftKey) {
        const firstItem = this._getItemAtIndex(0);
        if (!firstItem || firstItem.style.display === "none") return;

        const entity_id = firstItem.item.altText;
        if (entity_id?.includes(".")) {
          let domain = entity_id.split(".")[0];
          const hass = getHass();
          const state = hass.states[entity_id]?.state;

          if (domain === "group") domain = "homeassistant";

          if (state === "on") {
            hass.callService(domain, "turn_off", { entity_id });
            this.closeDialog();
            return;
          } else if (state === "off") {
            hass.callService(domain, "turn_on", { entity_id });
            this.closeDialog();
            return;
          }
        }
      }

      __handleInputKeyDown.bind(this)(ev);
    };

    const __generateCommandItems = HaQuickBar.prototype._generateCommandItems;
    HaQuickBar.prototype._generateCommandItems = function () {
      const commands = __generateCommandItems.bind(this)();
      commands.push({
        primaryText: "GUI Edit mode",
        action: () => (window as any).editMode(),
        categoryText: "WBAH",
        categoryKey: "server_control",
        strings: ["gui edit mode", "wbah"],
      });
      commands.push({
        primaryText: "RTL mode",
        action: () => (window as any).rtl(),
        categoryText: "WBAH",
        categoryKey: "server_control",
        strings: ["rtl mode", "wbah"],
      });
      return commands;
    };
  });

  usage();
}

wbah();
