const debounce = require('lodash.debounce');

function addTooltip(link) {
  // todo move to generic one
  const controller = new AbortController();
  const { signal } = controller;

  document.querySelectorAll('.pcs-chrome--tooltip-container').forEach((el) => el.remove());

  const container = document.createElement('div');
  container.classList.add('pcs-chrome--tooltip-container');

  const tooltip = document.createElement('div');
  tooltip.classList.add('pcs-chrome--tooltip');

  const loader = document.createElement('div');
  loader.classList.add('lds-ring');

  loader.appendChild(document.createElement('div'));
  loader.appendChild(document.createElement('div'));
  loader.appendChild(document.createElement('div'));

  tooltip.appendChild(loader);
  container.appendChild(tooltip);

  const rect = link.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  container.style.top = `${rect.top + scrollTop + (link.clientHeight === 0 ? 16 : link.clientHeight + 10)}px`;
  container.style.left = `${rect.left + scrollLeft}px`;

  document.body.appendChild(container);

  link.addEventListener('mouseout', () => {
    controller.abort();
    container.remove();
  }, {
    once: true,
  });

  fetch(link.href, { signal })
    .then((response) => response.text())
    .then((page) => {
      const parser = new DOMParser();
      const riderDom = parser.parseFromString(page, 'text/html');
      const photo = riderDom.querySelector('.rdr-img-cont');
      const profile = riderDom.querySelector('.rdr-info-cont');

      tooltip.innerHTML = photo.innerHTML + profile.innerHTML;
    })
    .catch((e) => console.log(e));
}

const debouncedAddTooltip = debounce(addTooltip, 500);

document.addEventListener('mouseover', (e) => {
  if (!e.target) return;

  let target;

  if (e.target.matches('a[href^=rider]')) {
    target = e.target;
  }

  if (e.target.parentNode && e.target.parentNode.matches('a[href^=rider]')) {
    target = e.target.parentNode;
  }

  if (!target) return;

  debouncedAddTooltip(target);
  target.addEventListener('mouseout', debouncedAddTooltip.cancel, { once: true });
});
