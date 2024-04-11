/**
 * Whether the argument path is current page or not.
 */
function isCurrentPage( href: string ): boolean {
  const url = window.location.pathname;
  const eliminateParam = href.substring(0, href.indexOf('?') >= 0 ? href.indexOf('?') : href.length);
  const eliminateHash = eliminateParam.substring(0, eliminateParam.indexOf('#') >= 0 ? eliminateParam.indexOf('#') : eliminateParam.length);

  if (eliminateHash === '') return true;

  return url === eliminateHash;
}

/**
 * Do scroll.
 * If href is not exist, scroll to the top.
 */
export function scroll( el: HTMLElement ) {
  const href = el.getAttribute('href');

  if ( href && !isCurrentPage(href) ) {
    return;
  }

  el.addEventListener('click', e => {
    e.preventDefault();

    if (!href) {
      window.scroll({ top: 0, behavior: "smooth" });
      return;
    }

    const targetEl = document.querySelector(href.substring(href.indexOf('#')));

    if (!targetEl) return;

    const pos = targetEl.getBoundingClientRect().top + window.scrollY;
    window.scroll({ top: pos, behavior: "smooth" });
  });
}
