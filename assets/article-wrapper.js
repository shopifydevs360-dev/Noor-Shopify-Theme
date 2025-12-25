    if ($(".js-pin-panel-wrap").length > 0) {
      gsap.set($(".js-pin-panel-wrap:not(:first)"), { autoAlpha: 0, y: 40 });
      var w = gsap.utils.toArray(".js-pin-panel-wrap"),
        y = 1e3 * w.length,
        b = y / w.length;
      w.forEach((e, t) => {
        const a = 0 == t,
          s = t == w.length - 1;
        ScrollTrigger.create({
          trigger: ".js-pinned-sections",
          start: "top -=" + b * t,
          end: "+=" + b,
          onEnter: () => {
            gsap.to(e, 0.6, { autoAlpha: 1, y: 0 }, 0),
              $(".active-counter").removeClass("active-counter"),
              $(`.js-pinned-sections [data-counter-index="${t}"]`).addClass(
                "active-counter"
              );
          },
          onEnterBack: () => {
            gsap.to(e, 0.6, { autoAlpha: 1, y: 0 }, 0),
              $(".active-counter").removeClass("active-counter"),
              $(`.js-pinned-sections [data-counter-index="${t}"]`).addClass(
                "active-counter"
              );
          },
          onLeave: () => {
            s || gsap.to(e, 0.6, { autoAlpha: 0, y: -20 }, 0);
          },
          onLeaveBack: () => {
            a || gsap.to(e, 0.6, { autoAlpha: 0, y: -20 }, 0);
          },
        });
      }),
        ScrollTrigger.create({
          trigger: ".js-pinned-sections",
          start: "top top",
          end: "+=" + y,
          markers: !1,
          pin: !0,
          scrub: !0,
        });
    }