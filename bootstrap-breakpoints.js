window.BSBR = (() => {
  let bbCounter = 0;

  const getElement = () => {
    return document.getElementById('bs-breakpoint-container');
  }

  const isVisible = () => {
    return get().style.display === 'block';
  }

  const show = () => {
    get().style.display = 'block';
  }

  const hideElement = (element) => {
    element.style.display = 'none';
  }

  const updateWidthLabel = () => {
    const label = document.getElementById('bs-width-label');
    if (!label) return;
    label.innerHTML = window.innerWidth + 'px';
  }

  const hide = () => {
    hideElement(get());
  }

  const toggle = () => {
    if (isVisible()) {
      hide();
    } else {
      show();
    }
  }

  const create = () => {
    let element = getElement();
    if (element) return element;
    element = document.createElement("div");
    element.setAttribute('id', 'bs-breakpoint-container');

    const bbNameLabel = document.createElement("div");
    bbNameLabel.setAttribute('id', 'bs-breakpoint-label');

    const widthLabel = document.createElement("small");
    widthLabel.setAttribute('id', 'bs-width-label');
    widthLabel.innerHTML = '0px';

    element.appendChild(bbNameLabel);
    element.appendChild(widthLabel);

    window.addEventListener('resize', updateWidthLabel);

    element.addEventListener('click', () => {
      hide();
    });
    hideElement(element);
    document.body.appendChild(element);

    setTimeout(updateWidthLabel, 0);
  }

  const get = () => {
    return create();
  }

  addShortcutListener = () => {
    document.body.addEventListener('keydown', (event) => {
      if (event.key !== 'b') return;
      if (++bbCounter >= 2) {
        return toggle();
      }
      setTimeout(() => {
        bbCounter = 0;
      }, 750);
    })
  }

  const initialize = () => {
    create();
    addShortcutListener();
  }

  return {
    initialize
  }
})();

BSBR.initialize();
