/**
 * json or not
 */
function is_json(target: any): boolean {
  try {
    JSON.parse(target);
  } catch (e) {
    return false;
  }
  return true;
}

const BREAK_POINT = 768;

/**
 * Whether the match argument to current device.
 */
function checkDevice( device: 'pc' | 'sp' | null ): boolean {
  const wsw  = window.screen.width;
  if (!device) {
    return true;
  }
  if (wsw < BREAK_POINT && device === 'sp') {
    return true;
  }
  if (wsw >= BREAK_POINT && device === 'pc') {
    return true;
  }
  return false;
}

export function registerModule(modules: { [key:string]: (el: HTMLElement, opts: any) => void }) {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll<HTMLElement>('[data-module]').forEach(el => {
      const keys = el.getAttribute('data-module')?.split(/\s+/);
      const opts = el.getAttribute('data-options') || null;
      const only = el.getAttribute('data-only') || null;

      keys?.forEach(key => {
        const module = modules[`${key}`];

        const options = opts ? keys.length > 1
          ? JSON.parse(opts)[key]
          : JSON.parse(opts)
          : {};

        const device = only ? is_json(only)
          ? JSON.parse(only)[key]
          : only
          : null;

          if (module && checkDevice(device)) {
            module(el, options);
          }
      })
    });
  });
}
