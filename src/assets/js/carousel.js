window.addEventListener('DOMContentLoaded', () => {
  let banner_controls = document.getElementsByClassName('banner-control');
  let banner_carousel = document.getElementsByClassName('banner-image');

  let change_banner = (e) => {
    let banner_id = e.target.getAttribute('data-banner-control-id');
    for (const carousel_item of banner_carousel) {
      if (carousel_item.getAttribute('data-banner-image-id') == banner_id) {
        carousel_item.classList.add('d-lg-block');
        carousel_item.classList.remove('d-none');
      } else {
        carousel_item.classList.add('d-none');
        carousel_item.classList.remove('d-lg-block');
      }
    }
  }

  banner_carousel[0].classList.add('d-lg-block');

  for (const control of banner_controls) {
    control.addEventListener('mouseenter', change_banner);
    control.addEventListener('focus', change_banner);
  }
});
