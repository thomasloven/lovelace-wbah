var e="0.1.0";!function(){if(window.wbah)return;window.wbah=!0;const o=()=>document.querySelector("home-assistant").hass,t=()=>{let e=document.querySelector("home-assistant");return e=e&&e.shadowRoot,e=e&&e.querySelector("home-assistant-main"),e=e&&e.shadowRoot,e=e&&e.querySelector("app-drawer-layout partial-panel-resolver"),e=e&&e.shadowRoot||e,e=e&&e.querySelector("ha-panel-lovelace"),e=e&&e.shadowRoot,e=e&&e.querySelector("hui-root"),e};Object.defineProperty(window,"hass",{get:()=>o()}),Object.defineProperty(window,"lovelace",{get:()=>{const e=t();if(e)return e.lovelace}}),Object.defineProperty(window,"view",{get:()=>{let e=t();return e=e&&e.shadowRoot,e=e&&e.querySelector("ha-app-layout"),e=e&&e.querySelector("#view"),e=e&&e.firstElementChild,e}}),window.editMode=()=>{const e=t();e&&e.lovelace.setEditMode(!e.lovelace.editMode)},window.rtl=()=>{var e;const t=o(),n=(null===(e=t.locale)||void 0===e?void 0:e.language)||"en",a=document.querySelector("home-assistant");t.translationMetadata.translations[n].isRTL=!t.translationMetadata.translations[n].isRTL,t.language="abc",a.hassChanged(t,t),a.dispatchEvent(new CustomEvent("hass-language-select",{detail:n}))},customElements.whenDefined("ha-quick-bar").then((()=>{const e=customElements.get("ha-quick-bar"),t=e.prototype._handleInputKeyDown;e.prototype._handleInputKeyDown=function(e){var n;if("Enter"===e.code&&e.shiftKey){const e=this._getItemAtIndex(0);if(!e||"none"===e.style.display)return;const t=e.item.altText;if(null==t?void 0:t.includes(".")){let e=t.split(".")[0];const a=o(),i=null===(n=a.states[t])||void 0===n?void 0:n.state;if("group"===e&&(e="homeassistant"),"on"===i)return a.callService(e,"turn_off",{entity_id:t}),void this.closeDialog();if("off"===i)return a.callService(e,"turn_on",{entity_id:t}),void this.closeDialog()}}t.bind(this)(e)};const n=e.prototype._generateCommandItems;e.prototype._generateCommandItems=function(){const e=n.bind(this)();return e.push({primaryText:"GUI Edit mode",action:()=>window.editMode(),categoryText:"WBAH",categoryKey:"server_control",strings:["gui edit mode","wbah"]}),e.push({primaryText:"RTL mode",action:()=>window.rtl(),categoryText:"WBAH",categoryKey:"server_control",strings:["rtl mode","wbah"]}),e}})),console.groupCollapsed(`%c === %cLovelace WBAH ${e}%c ===%c`,"font-weight: bold","color: green; font-weight: bold","font-weight: bold",""),console.info("You have Lovelace WBAH installed, that will add some functionality to your frontend"),console.group("%cExtended Variables and functions in global scope: %c","font-weight: bold",""),console.table({"window.hass":"hass object","window.lovelace":"lovelace object","window.view":"View root element","window.editMode()":"Enable GUI editing mode (sandbox only in yaml mode)","window.rtl()":"Toggle language RTL"}),console.groupEnd(),console.group("%cExtended Quick launch commands (press c): %c","font-weight: bold",""),console.table({"GUI Edit mode":"Enable GUI editing mode (sandbox only in yaml mode)","RTL mode":"Toggle language RTL"}),console.groupEnd(),console.group("%cExtended Quick launch entities (press e): %c","font-weight: bold",""),console.info("Shift+Enter will toggle entities is possible"),console.groupEnd(),console.groupEnd()}();
