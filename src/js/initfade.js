var elements = [].slice.apply(document.querySelectorAll('.js-fadeOnScroll'));

    (new FadeOnScroll({
      elements:   elements,
      threshold:  50
    })).init();