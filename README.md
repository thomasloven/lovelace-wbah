# Lovelace WBAH

Fine, I'm gonna make my own lovelace! With blackjack.. and hookers... In fact, forget making my own lovelace.
I'll just add random stuff on to it instead.

This plugin is a bit special.
It's basically a collection of quality of life improvements for me and me alone to help me with experimenting for other plugins.

But maybe you can find a use for it too.

This is not available in HACS by default.

## Installing

For installing this, I actually recommend adding it to your `frontend` configuration in `configuration.yaml` thusly:

```yaml
frontend:
  extra_module_url:
    - /local/wbah.js
```

That way it will work outside of lovelace too.

## Functionality

### Console commands

Lovelace WBAH adds some variables and functions to the global window scope of the frontend. Those are:

|              |                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `hass`       | The `hass` object with all states and stuff.                                                                                                   |
| `lovelace`   | The `lovelace` object with lovelace configuration and stuff. This only works if lovelace is currently showing.                                 |
| `view`       | A reference to the root view element. Meant as a shortcut for manual tree navigation.                                                          |
| `editMode()` | Calling this function will enable GUI editing mode even in a yaml dashboard. <br>Saving changes will only work for storage dashboards, though. |
| `rtl()`      | Toggle RTL mode for current language                                                                                                           |

### Quick launch menu

The quick launche menu can be opened by pressing `e` on your keyboard and lets you open the more-info dialog of entities.
Lovelace WBAH adds the shortcut shift+Enter for toggling the top entity on or off (is possible). Shift+Enter will also run scripts.

### Quick launch commands

Lovelace WBAH adds the following commands to the quick launch menu (opened by pressing `c` on your keyboard):

|                 |                              |
| --------------- | ---------------------------- |
| `GUI Edit mode` | Same as calling `editMode()` |
| `RTL mode`      | Same as calling `rtl()`      |

All commands can be found by searching for "WBAH" in the quick launch menu.

## Demo

![uSpfKft2uq](https://user-images.githubusercontent.com/1299821/124022726-7ba7c080-d9ed-11eb-843d-48d512bc53e6.gif)

---

<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
