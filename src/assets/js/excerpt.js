let highlight_image = (highlighted, thumbnail) => {
  highlighted.setAttribute('src', thumbnail.getAttribute('src'));
  highlighted.setAttribute('alt', thumbnail.getAttribute('alt'));
}

window.addEventListener('DOMContentLoaded', () => {
  let highlight = document.querySelector('.picture-highlight__image');
  let controls = document.querySelectorAll('.picture-control');

  for (control of controls) {
    control.addEventListener('click', (e) => {
      highlight_image(highlight, e.target);
    });
    control.addEventListener('focus', (e) => {
      highlight_image(highlight, e.target.querySelector('.picture-control__image'));
    });
  }
});
