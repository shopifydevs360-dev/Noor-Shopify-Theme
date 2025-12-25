!window.location.origin.includes(".uk") &&
  window.theme.redirect_enable &&
  fetch("https://api.ipregistry.co/?key=tryout", { method: "GET" })
    .then((e) => e.json())
    .then((e) => {
      e &&
        e.location &&
        e.location.country &&
        e.location.country.code &&
        e.location.country.code.toLowerCase() ===
          window.theme.redirect_from_code &&
        (window.location.href = window.theme.redirect_to_url);
    }),
  $(document).ready(function () {
    var e, t;
    function a() {
      (windowWidth = $(window).innerWidth()), (e = windowWidth <= 1024);
    }
    function s() {
      $("body").removeClass(
        "open-flyout-nav open-panel-2 open-panel-3 open-panel-4 open-cart open-search open-login open-language open-currency"
      ),
        $(".js-nav-panel").attr("aria-hidden", "true"),
        $(".nav-link--active").removeClass("nav-link--active"),
        $(".nav-animate-in").removeClass("nav-animate-in"),
        o(),
        $(".js-open-nav-section .js-close-icon-text").hide(),
        $(".js-open-nav-section .js-open-icon-text").fadeIn(350);
    }
    function o() {
      $(".js-panel-level-4").attr("aria-hidden", "true"),
        $(".js-shoppable-inner:visible .product .inner").removeClass(
          "nav-animate-in"
        );
    }
    function n(e) {
      setTimeout(function () {
        e.each(function (e) {
          var t = this;
          setTimeout(function () {
            $(t).addClass("nav-animate-in");
          }, 90 * e);
        });
      }, 50);
    }
    function i(e, t) {
      var a = $(e),
        s = $(e).data("related-submenu"),
        o =
          ($(e).data("collection"),
          setTimeout(function () {
            $(".js-submenu").hide(),
              $(".js-submenu").attr("aria-hidden", "true"),
              $(".js-submenu .active").removeClass("active"),
              $(".js-submenu .nav-animate-in").removeClass("nav-animate-in");
            var e = $('[data-submenu="' + s + '"]');
            $(".js-panel-level-3").attr("aria-hidden", "false"),
              e.show(),
              $("body").addClass("open-panel-3"),
              n(e.find("a")),
              setTimeout(function () {
                0 == $('[data-submenu="' + s + '"] .active').length &&
                  e.find("li:first-of-type a").addClass("active");
              }, 450);
          }, 100));
      a.mouseleave(function () {
        clearTimeout(o);
      });
    }
    function r(e) {
      var a = $(e),
        s = $(e).data("collection"),
        o = $('.js-shoppable-inner [data-subnav-collection="' + s + '"]');
      if (-1 === s.indexOf("own-bundle") && "" !== s) {
        var i = setTimeout(function () {
          $(".js-filter-submenu.active").removeClass("active"),
            a.addClass("active"),
            $(".js-shoppable-inner:visible"),
            (function (e, a, s, o) {
              var i = $(a).find(".product");
              t && t.includes("hair")
                ? $(".nav-featured-link").show()
                : $(".nav-featured-link").hide(),
                $(".js-panel-level-4").attr("aria-hidden", "false"),
                $("body").addClass("open-panel-4"),
                $(".js-shoppable-inner .product").removeClass("nav-animate-in"),
                $(".js-shoppable-subnav").hide(),
                $(".js-shoppable-inner .product").hide(),
                $(a).show(),
                $(a).find(".product").show(),
                $(a).find(".product img").show(),
                $(
                  ".js-panel-level-4 .scrollable, .js-shoppable-inner"
                ).scrollTop(0),
                $(o)
                  .closest(".js-nav-panel")
                  .find("a")
                  .removeClass("nav-item--active"),
                $(o).addClass("nav-item--active"),
                n($(i));
            })(0, o, 0, e);
        }, 25);
        a.mouseleave(function () {
          clearTimeout(i);
        });
      }
    }
    console.log("Shopify Development - Sarah Holden"),
      console.log("https://saraheholden.com/"),
      console.log(" "),
      console.log("Site Design - AndCompany"),
      console.log("https://www.andcompany.com/"),
      $(window).on("resize", a),
      a(),
      setTimeout(function () {
        $(".hamburger").addClass("loaded");
      }, 3e3),
      $(".hamburger").on("click", function (e) {
        e.preventDefault(),
          $("body").hasClass("open-panel-2")
            ? s()
            : (s(),
              $(".nav-animate-in").removeClass("nav-animate-in"),
              $("body").addClass("open-flyout-nav open-panel-2"),
              $(".js-panel-level-2").attr("aria-hidden", !1),
              $(".js-panel-level-2").focus(),
              n($(".js-panel-level-2 a")),
              $.each($(".js-nav-lazy-load"), function (e, t) {
                var a = $(this).data("nav-src");
                $(this).attr("src", a);
              }));
      }),
      $(".js-close-flyout").on("click", function () {
        s();
      }),
      $(".js-close-panel-level-4").on("click", function () {
        $(".js-panel-level-4").attr("aria-hidden", "true"),
          $("body").removeClass("open-panel-4");
      }),
      $(".js-close-panel-level-3").on("click", function () {
        $(".js-panel-level-3").attr("aria-hidden", "true"),
          $("body").removeClass("open-panel-3");
      });
    const l = window.matchMedia("(max-width: 1024px)");
    function c(e) {
      e.matches
        ? ($("[data-related-submenu]").off("mouseenter", d),
          $(".js-panel-level-2, .js-panel-level-2 .childless ").off(
            "mouseenter",
            p
          ),
          $(".js-filter-submenu").off("mouseover", u))
        : ($("[data-related-submenu]").on("mouseenter", d),
          $(".js-panel-level-2, .js-panel-level-2 .childless ").on(
            "mouseenter",
            p
          ),
          $(".js-filter-submenu").on("mouseover", u));
    }
    function d(e) {
      i(this),
        (t = $(this).text() && $(this).text().trim().toLowerCase()),
        $(this)
          .closest(".js-nav-panel")
          .find("a")
          .removeClass("nav-item--active"),
        $(this).addClass("nav-item--active");
    }
    function p() {
      $(".js-panel-level-3").attr("aria-hidden", "true"),
        $(".js-panel-level-3 .nav-animate-in").removeClass("nav-animate-in"),
        $("body").removeClass("open-panel-3 open-panel-4"),
        o();
    }
    function u() {
      r(this);
    }
    var m, f;
    function h() {
      $(window).scrollTop() > 80
        ? $("body").addClass("scrolled")
        : $("body").removeClass("scrolled");
    }
    function v(e, t, a) {
      var s = gsap.timeline({ scrollTrigger: { trigger: a, start: t } });
      const o = new SplitText(a, {
          type: "lines",
          linesClass: "split-line-child",
        }),
        n = new SplitText(a, {
          type: "lines",
          linesClass: "split-line-wrap-++",
        });
      s.staggerFrom(
        $(a).find(".split-line-child"),
        1.2,
        { y: "100%", ease: Power3.easeOut, delay: e },
        0.15
      ).add(function () {
        n.revert(), o.revert();
      });
    }
    if (
      (c(l),
      l.addListener(c),
      $("[data-related-submenu]").on("click", function (t) {
        if (e) {
          var a = $(this),
            s = "true" == a.attr("data-tapped");
          s && clearTimeout(m),
            s ||
              (t.preventDefault(),
              a.attr("data-tapped", "true"),
              (m = setTimeout(function () {
                i(a), a.attr("data-tapped", "false");
              }, 200)));
        }
      }),
      $(".js-filter-submenu").on("click", function (t) {
        if (e) {
          var a = $(this);
          if (a.hasClass("js-filter-submenu--disable")) {
            var s = a.attr("href");
            return void (s && (window.location.href = s));
          }
          var o = "true" == a.attr("data-tapped");
          o && clearTimeout(f),
            o ||
              (t.preventDefault(),
              a.attr("data-tapped", "true"),
              (f = setTimeout(function () {
                r(a), a.attr("data-tapped", "false");
              }, 200)));
        }
      }),
       
      $(document).on("click", ".js-open-nav-section", function (e) {
        e.preventDefault();
        var t = $(this).data("nav-section"),
          a = $(this);
        $("body").hasClass(`open-${t}`)
          ? s()
          : $("body").hasClass("open-flyout-nav")
          ? (s(),
            setTimeout(function () {
              a.find(".js-open-icon-text").hide(),
                a.find(".js-close-icon-text").fadeIn(350),
                $("body").addClass(`open-${t} open-flyout-nav`),
                "search" == t && $(".js-search").focus(),
                "login" == t && $(".js-login-input").focus(),
                "language" == t && $(".js-language").focus(),
                "currency" == t && $(".js-currency").focus();
            }, 400))
          : (a.find(".js-open-icon-text").hide(),
            a.find(".js-close-icon-text").fadeIn(350),
            $("body").addClass(`open-${t} open-flyout-nav`),
            "search" == t &&
              setTimeout(function () {
                $(".js-search").focus();
              }, 200),
            "login" == t &&
              setTimeout(function () {
                $(".js-login-input").focus();
              }, 200));
      }),
      gsap.registerPlugin(ScrollTrigger),
      ScrollTrigger.defaults({ markers: !1 }),
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          gsap.utils.toArray("[data-from]").forEach((e, t) => {
            const a = JSON.parse(e.dataset.from),
              s = JSON.parse(e.dataset.to),
              o = e.dataset.start ? e.dataset.start : "top bottom",
              n = e.dataset.end ? e.dataset.end : "bottom top";
            gsap
              .timeline({
                scrollTrigger: { trigger: e, scrub: !0, start: o, end: n },
              })
              .fromTo(e, a, s);
          });
        },
        "(max-width: 1024px)": function () {
          gsap.utils.toArray("[data-mobile-from]").forEach((e, t) => {
            const a = JSON.parse(e.dataset.mobileFrom),
              s = JSON.parse(e.dataset.mobileTo),
              o = e.dataset.start ? e.dataset.start : "top bottom",
              n = e.dataset.end ? e.dataset.end : "bottom top";
            gsap
              .timeline({
                scrollTrigger: { trigger: e, scrub: !0, start: o, end: n },
              })
              .fromTo(e, a, s);
          });
        },
      }),
      gsap.utils.toArray(".scroll-enter").forEach((e, t) => {
        const a = e.dataset.delay ? e.dataset.delay : 0;
        gsap
          .timeline({ scrollTrigger: { trigger: e, start: "center bottom" } })
          .fromTo(
            e,
            1.2,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: Power4.easeOut, delay: a }
          );
      }),
      gsap.utils.toArray(".js-animate").forEach((e, t) => {
        ScrollTrigger.create({
          trigger: e,
          start: "top 80%",
          onEnter: (t) => $(e).addClass("animate-in"),
        });
      }),
      $(".js-animate-on-load").addClass("animate-in"),
      h(),
      $(window).on("scroll", function () {
        h();
      }),
      $(".js-update-bg").length > 0 &&
        gsap.utils.toArray(".js-update-bg").forEach((e, t) => {
          ScrollTrigger.create({
            trigger: ".js-update-bg",
            start: "top 45%",
            end: "bottom center",
            onEnter: (t) =>
              $("body").css("background-color", $(e).attr("data-color")),
            onLeave: (e) => $("body").css("background-color", "#F3F3F4"),
            onEnterBack: (t) =>
              $("body").css("background-color", $(e).attr("data-color")),
            onLeaveBack: (e) => $("body").css("background-color", "#F3F3F4"),
          });
        }),
      ScrollTrigger.batch("[data-stagger]", {
        onEnter: (e) =>
          gsap.to(e, 1.2, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            ease: Power1.easeOut,
          }),
        start: "40px bottom",
      }),
      document.fonts.ready.then(function () {
        $('[data-reveal="lines-masked"]').addClass("loaded"),
          $('[data-reveal="lines-masked-delayed"]').addClass("loaded"),
          $('[data-reveal="lines-masked-slow"]').addClass("loaded"),
          $('[data-reveal="lines-masked-desc"]').addClass("loaded"),
          $('[data-reveal="words-masked"]').addClass("loaded"),
          gsap.utils
            .toArray('[data-reveal="lines-masked-slow"]')
            .forEach((e, t) => {
              var a = gsap.timeline({
                scrollTrigger: { trigger: e, start: "center bottom" },
              });
              const s = new SplitText(e, {
                  type: "lines",
                  linesClass: "split-line-child",
                }),
                o = new SplitText(e, {
                  type: "lines",
                  linesClass: "split-line-wrap-++",
                });
              a.staggerFrom(
                $(e).find(".split-line-child"),
                1.6,
                { y: "100%", ease: Power3.easeOut },
                0.3
              ).add(function () {
                o.revert(), s.revert();
              });
            }),
          gsap.utils.toArray('[data-reveal="lines-masked"]').forEach((e, t) => {
            v(
              e.dataset.delay ? e.dataset.delay : 0,
              e.dataset.start ? e.dataset.start : "center bottom",
              e
            );
          }),
          gsap.utils
            .toArray('[data-reveal="lines-masked-delayed"]')
            .forEach((t, a) => {
              let s = t.dataset.delay ? t.dataset.delay : 0;
              e && (s = t.dataset.delay ? t.dataset.delay - 0.6 : 0),
                v(s, t.dataset.start ? t.dataset.start : "center bottom", t);
            }),
          gsap.utils
            .toArray('[data-reveal="lines-masked-desc"]')
            .forEach((e, t) => {
              v(
                e.dataset.delay ? e.dataset.delay : 0,
                e.dataset.start ? e.dataset.start : "center bottom",
                $(e).find("p")
              );
            }),
          gsap.utils.toArray('[data-reveal="words-masked"]').forEach((e, t) => {
            const a = e.dataset.start ? e.dataset.start : "top 80%";
            var s = gsap.timeline({ scrollTrigger: { trigger: e, start: a } }),
              o = new SplitText($(e).find(".animate-me"), {
                type: "lines,words",
                linesClass: "split-line-wrap",
                wordsClass: "split-line-child",
              });
            s.staggerFrom(
              $(e).find(".split-line-child"),
              1.4,
              { y: "100%", skewX: -15, rotate: 2, ease: Power4.easeOut },
              0.1
            ),
              $(window).resize(function () {
                s.progress(1), o.revert();
              });
          }),
          gsap.utils.toArray('[data-reveal="blocks-slide"]').forEach((e, t) => {
            const a = e.dataset.start ? e.dataset.start : "top 80%";
            gsap
              .timeline({ scrollTrigger: { trigger: e, start: a } })
              .staggerFromTo(
                $(e).find(".animate-me"),
                1.4,
                { y: "200px", autoAlpha: 0, ease: Power4.easeOut },
                { y: "0", autoAlpha: 1, ease: Power4.easeOut },
                0.1
              );
          });
      }),
      $(".scaling-mask").length > 0 &&
        ScrollTrigger.matchMedia({
          "(max-width: 1024px) and (min-width: 768px)": function () {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".home-intro",
                  scrub: !0,
                  start: "100px center",
                  end: "bottom center",
                },
              })
              .fromTo(
                ".scaling-mask",
                1,
                { clipPath: "inset(7rem 16rem 12rem 16rem)" },
                { clipPath: "inset(0px 0px 0px 0px)", ease: Power1.easeIn }
              );
          },
          "(max-width: 767px)": function () {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".home-intro",
                  scrub: !0,
                  start: "top bottom",
                  end: "bottom center",
                },
              })
              .fromTo(
                ".scaling-mask",
                1,
                { clipPath: "inset(7rem 9rem 10rem 9rem)" },
                { clipPath: "inset(0px 0px 0px 0px)", ease: Power1.easeIn }
              );
          },
          "(min-width: 1025px)": function () {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: ".home-intro",
                  scrub: !0,
                  start: "100px center",
                  end: "bottom center",
                },
              })
              .fromTo(
                ".scaling-mask",
                1,
                { clipPath: "inset(22rem 33.9rem 22rem 33.9rem)" },
                { clipPath: "inset(0px 0px 0px 0px)", ease: Power1.easeIn }
              );
          },
        }),
      $(".template-index").length > 0 &&
        ScrollTrigger.matchMedia({
          "(min-width: 1025px)": function () {
            var e = $(window).innerWidth(),
              t = gsap.timeline(),
              a = (($(".sidebar-image").innerWidth() - 3) / e) * 100 + "%";
            document.documentElement.classList.contains("ab-test") &&
              (a = "15%"),
              t
                .to(
                  ".swiper-container-hero",
                  0.6,
                  { x: a, rotation: 1e-4, delay: 0.2, ease: Power1.easeIn },
                  0
                )
                .to(
                  ".js-hero-swiper-text",
                  0.6,
                  {
                    width: "auto",
                    rotation: 1e-4,
                    delay: 0.2,
                    ease: Power1.easeIn,
                  },
                  0
                )
                .to(".sidebar-image", { x: 0, delay: 0.4 }, 0)
                .to(".sidebar-nav", { x: 0, autoAlpha: 1, delay: 0.6 })
                .to(
                  ".js-hero-swiper-nav",
                  { autoAlpha: 1, y: 0, delay: 2.2 },
                  0
                ),
              gsap.timeline({
                scrollTrigger: {
                  trigger: ".template-index .full-screen-slideshow",
                  start: "20px",
                  end: "+=10",
                  onEnter: (e) => {
                    $("body").addClass("collapse-side");
                  },
                  onEnterBack: (e) => $("body").removeClass("collapse-side"),
                },
              });
          },
        }),
      $(".template-product").length > 0)
    ) {
      function g() {
        let e = null;
        clearTimeout(e),
          (e = setTimeout(function () {
            const e = $(".sidebar-nav")[0].getBoundingClientRect().height;
            document.documentElement.style.setProperty(
              "--nav-height",
              e + "px"
            );
          }, 500));
      }
      g(),
        $(window).on("resize", g),
        gsap.timeline({
          scrollTrigger: {
            trigger: ".template-product",
            start: "20px",
            end: "+=10",
            onEnter: (e) => {
              $("body").addClass("collapse-sticky");
            },
            onEnterBack: (e) => $("body").removeClass("collapse-sticky"),
          },
        });
    }
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
    if ($(".js-promo-bar-wrap").length > 0) {
      const V = $(".promo-carousel-message").length;
      if (V > 1) {
        var j = 0;
        setInterval(function () {
          document.hasFocus() &&
            (j == V - 1 ? (j = 0) : (j += 1),
            $(".promo-carousel-message:visible").fadeOut(500),
            $(".promo-carousel-message").eq(j).delay(200).fadeIn(700));
        }, 6e3);
      }
    }
    $(".sticky-promo-wrap").length > 0 &&
      ($(window).innerWidth() <= 1024 ||
      $(".hero-outer-wrap").prevAll(".sticky-promo-wrap").length > 0
        ? $("body").addClass("has-promo-bar")
        : ($(window).scrollTop() >= $(".sticky-promo-wrap").offset().top &&
            $("body").addClass("has-promo-bar"),
          ScrollTrigger.create({
            trigger: ".home-intro",
            start: "top 60px",
            onEnter: (e) => $("body").addClass("has-promo-bar"),
            onLeaveBack: (e) => $("body").removeClass(""),
          }))),
      $(".reverse-nav").length > 0 &&
        gsap.timeline({
          scrollTrigger: {
            trigger: ".reverse-nav",
            start: "bottom top",
            onEnter: (e) => $("body").removeClass("nav-theme-light"),
            onEnterBack: (e) => $("body").addClass("nav-theme-light"),
          },
        }),
      new Swiper(".swiper-container-pdp", {
        pagination: { el: ".swiper-pagination", clickable: "true" },
        speed: 600,
        allowTouchMove: !0,
        loop: !0,
      }),
      new Swiper(".swiper-container-pdp-mobile", {
        navigation: {
          nextEl: ".swiper-next-text",
          prevEl: ".swiper-prev-text",
        },
        speed: 600,
        allowTouchMove: !0,
        loop: !0,
      });
    const k = new Swiper(".collection-tab", {
      navigation: { nextEl: ".swiper-next-text", prevEl: ".swiper-prev-text" },
      speed: 600,
      allowTouchMove: !0,
      loop: !0,
      updateOnWindowResize: !0,
      autoplay: { delay: 1e4, disableOnInteraction: !0 },
      effect: "fade",
      fadeEffect: { crossFade: !1 },
    });
    new Swiper(".swiper-container-pdp-supplements", {
      autoplay: { delay: 5e3, pauseOnMouseEnter: !0 },
      speed: 600,
      allowTouchMove: !0,
      loop: !0,
      effect: "fade",
      fadeEffect: { crossFade: !0 },
    });
    var C = document.querySelectorAll(".swiper-container-hero video");
    k.on("slideChange", function () {
      let t = k.activeIndex,
        a = k.slides[t],
        s = $(a).find('[data-reveal="lines-masked-delayed"]');
      const o = new SplitText(s, {
          type: "lines",
          linesClass: "split-line-child",
        }),
        n = new SplitText(s, {
          type: "lines",
          linesClass: "split-line-wrap-++",
        });
      var i = $(a).attr("data-text-color");
      i &&
        ($(".swiper-nav-wrapper").find("button").css("color", i),
        $(".swiper-nav-wrapper").find(".line").css("background-color", i)),
        new TimelineMax()
          .staggerFrom(
            $(a).find(".split-line-child"),
            1.5,
            { y: "100%", ease: Power3.easeOut, delay: 0.15 },
            0.1
          )
          .add(function () {
            n.revert(), o.revert();
          });
      for (var r = 0; r < C.length; r++) C[r].pause();
      if ($(a).find(".js-video").length > 0) {
        var l = $(a).find(".js-video").eq(0),
          c = l.find("source");
        c.attr("src") ||
          (e
            ? c.attr("src", c.data("mobile-src"))
            : c.attr("src", c.data("src")),
          l.trigger("load")),
          l.trigger("play");
      }
    }),
      new Swiper(".swiper-container-before-after", {
        navigation: {
          nextEl: ".swiper-next-text-ba",
          prevEl: ".swiper-prev-text-ba",
        },
        speed: 800,
        loop: !0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        allowTouchMove: !0,
        breakpoints: {
          100: { slidesPerView: 1, slidesPerGroup: 1 },
          1025: { slidesPerView: 2, slidesPerGroup: 2, allowTouchMove: !1 },
        },
      }),
      new Swiper(".swiper-cart-upsel", {
        navigation: {
          nextEl: ".swiper-next-cart-upsel",
          prevEl: ".swiper-prev-cart-upsel",
        },
        speed: 800,
        slidesPerView: 2.2,
        spaceBetween: 10,
        allowTouchMove: !0,
      });
    const x = new Swiper(".swiper-container-product", {
      speed: 600,
      allowTouchMove: !0,
      grabCursor: !0,
      loop: !1,
      slidesPerView: 4,
      spaceBetween: 40,
      freeMode: !0,
      freeModeMomentum: !0,
      freeModeMomentumVelocityRatio: 0.3,
      scrollbar: { el: ".swiper-scrollbar", draggable: !0 },
      mousewheel: !0,
      mousewheel: { forceToAxis: !0 },
      breakpoints: {
        100: { slidesPerView: 1.3, spaceBetween: 20 },
        768: { slidesPerView: 2.3, spaceBetween: 20 },
        1025: { slidesPerView: 3.2, spaceBetween: 40 },
        1440: { slidesPerView: 3.6 },
      },
    });
    new Swiper(".swiper-container-video", {
      speed: 600,
      allowTouchMove: !0,
      grabCursor: !0,
      loop: !1,
      slidesPerView: 4,
      spaceBetween: 20,
      freeMode: !0,
      freeModeMomentum: !0,
      freeModeMomentumVelocityRatio: 0.3,
      mousewheel: !0,
      mousewheel: { forceToAxis: !0 },
      breakpoints: {
        300: { slidesPerView: 1.2, spaceBetween: 20 },
        767: { slidesPerView: 1.7, spaceBetween: 20 },
        1025: { slidesPerView: 3.6, spaceBetween: 40 },
        1440: { slidesPerView: 3.6 },
      },
    }),
      new Swiper(".swiper-container-filter", {
        slidesPerView: "auto",
        spaceBetween: 50,
      }),
      $(".js-slider-filter").on("click", function (e) {
        e.preventDefault();
        var t = $(this),
          a = t.attr("data-filter"),
          s = t.closest(".js-product-carousel");
        s.find("li").removeClass("active"),
          t.closest("li").addClass("active"),
          s.find(".product-slide").hide(),
          s.find(".product-slide img").addClass("animate-out"),
          s.find('.product-slide[data-collections*="' + a + '"]').fadeIn(500),
          s
            .find('.product-slide[data-collections*="' + a + '"] img')
            .removeClass("animate-out"),
          x.updateSize(),
          x.updateSlides(),
          x.updateProgress(),
          x.updateSlidesClasses(),
          x.slideTo(0),
          x.scrollbar.updateSize();
      }),
      $(".site-footer").on("click", ".footer-accordion-toggle", function () {
        var e = $(this).closest(".footer-accordion-panel");
        e.toggleClass("expanded"),
          e.find(".footer-accordion-text").slideToggle(300),
          e
            .find(".footer-accordion-text")
            .attr("aria-expanded", function (e, t) {
              return "true" == t ? "false" : "true";
            });
      });
    const T = [];
    function S(e) {
      var t = $(e).data("overlay-name"),
        a = $('.overlay-content[data-overlay-name="' + t + '"]');
      return (
        a.addClass("active-overlay"),
        bodyScrollLock.disableBodyScroll(a[0]),
        setTimeout(function () {
          a.addClass("animate-in");
        }, 200),
        $("body").addClass("open-overlay"),
        a.focus(),
        a.attr("aria-expanded", "true"),
        T.push(a[0]),
        a
      );
    }
    function E() {
      const e = T.pop();
      $(e).removeClass("active-overlay animate-in"),
        T.length
          ? bodyScrollLock.disableBodyScroll(e)
          : ($("body").removeClass("open-overlay"),
            bodyScrollLock.clearAllBodyScrollLocks()),
        $(e).attr("aria-expanded", "false");
    }
    function P(e) {
      const t = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}$/.test(e);
      return t && "" !== t;
    }
    function _(e) {
      e.pause(),
        E(),
        setTimeout(function () {
          e.destroy();
        }, 600);
    }
    $("body").on("click", ".js-show-overlay", function (e) {
      e.preventDefault(), S(this);
    }),
      $("body").on("click", ".js-close-overlay", function () {
        E();
      }),
      $(".simple-modal").on("click", function (e) {
        0 == $(e.target).closest(".inner").length && E();
      }),
      $(".event_profile_login_submit").on("click", function (e) {
        localStorage.setItem("loginSubmitClick", "true"),
          null != localStorage.getItem("loginRegisterSubmitClick") &&
            localStorage.setItem("loginRegisterSubmitClick", "false");
      }),
      $(".event_profile_register_submit").on("click", function (e) {
        localStorage.setItem("loginRegisterSubmitClick", "true"),
          null != localStorage.getItem("loginSubmitClick") &&
            localStorage.setItem("loginSubmitClick", "false");
      }),
      window.addEventListener("load", () => {
        const e = localStorage.getItem("loginSubmitClick"),
          t = localStorage.getItem("loginRegisterSubmitClick");
        document.querySelectorAll("form").forEach((a) => {
          const s = a.querySelector(".errors"),
            o = a.getAttribute("id");
          s &&
            (s.style.display =
              "true" !== e ||
              ("customer_login" !== o && "customer_login1" !== o)
                ? "true" === t && "create_customer--" === o
                  ? "block"
                  : "none"
                : "block");
        });
      }),
      $(".event_profile_register_submit").on("click", function (e) {
        e.preventDefault();
        const t = $(this).closest(".js-account-create"),
          a = t.find('input[type="password"]').val(),
          s = t.find(".password-error");
        P(a)
          ? t.submit()
          : (s.css("display", "block"),
            setTimeout(() => {
              s.css("display", "none");
            }, 7e3));
      }),
      $(".btn--reset-password").on("click", function (e) {
        e.preventDefault();
        const t = $(this).closest("#reset_customer_password"),
          a = t.find('input[type="password"]').val(),
          s = t.find(".password-error");
        P(a)
          ? t.submit()
          : (s.css("display", "block"),
            setTimeout(() => {
              s.css("display", "none");
            }, 7e3));
      }),
      $("#create_customer").on("submit", function (e) {
        e.preventDefault();
        var t = $(this);
        if (
          (t.find('[type="submit"]').text("Submitting...").prop("disabled", !0),
          t.find('[name="customer[accepts_marketing]"]').is(":checked"))
        ) {
          var a = {
            type: "subscription",
            attributes: {
              custom_source: "Create Account",
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email: t.find('[name="customer[email]"]').val(),
                    first_name: t.find('[name="customer[first_name]"]').val(),
                    last_name: t.find('[name="customer[last_name]"]').val(),
                  },
                },
              },
            },
            relationships: { list: { data: { type: "list", id: "RCm7nK" } } },
          };
          $.ajax({
            method: "POST",
            headers: {
              revision: "2024-05-15",
              "content-type": "application/json",
            },
            url: "https://a.klaviyo.com/client/subscriptions/?company_id=Vesjd6",
            data: a,
          })
            .done(function (e) {
              e.success || console.error("Error Klaviyo: ", e.errors),
                t.off().submit();
            })
            .fail(function (e) {
              console.error(e), t.off().submit();
            });
        } else t.off().submit();
      }),
      $("#marketing--footer-checkbox").on("change", function (e) {
        const t = $(this)
          .closest(".klaviyo-form")
          .find(".event_profile_email_signup");
        $(this).is(":checked")
          ? t.removeAttr("disabled")
          : t.attr("disabled", "");
      }),
      $("#popup-klaviyo-email").on("focus", function () {
        $(this).css("border", "none"),
          $(this).css("border-bottom", "1px solid #231f20");
      }),
      $(".js-klaviyo-form").on("submit", function (e) {
        e.preventDefault();
        var t = $(this),
          a = t.find('[type="email"]').val(),
          s = t.find('[type="email"]');
        if (
          (function (e) {
            const t =
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                e
              );
            return t && "" !== t;
          })(a)
        ) {
          var o = t.find('[type="submit"]'),
            n = t.find('[type="submit"]').html();
          o.text("Submitting...").prop("disabled", !0);
          var i = t.attr("data-klaviyo-source"),
            r = t.attr("data-list-id"),
            l = t.find('[name="email"]').val(),
            c = t.find('[name="name"]').val(),
            d = t.find('[name="phone"]').val(),
            p = {
              method: "POST",
              headers: {
                revision: "2024-02-15",
                "content-type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  type: "subscription",
                  attributes: {
                    custom_source: i || "Create Account",
                    profile: {
                      data: {
                        type: "profile",
                        attributes: {
                          email: l,
                          first_name: c,
                          phone_number: d,
                        },
                      },
                    },
                  },
                  relationships: { list: { data: { type: "list", id: r } } },
                },
              }),
            };
          fetch(
            "https://a.klaviyo.com/client/subscriptions/?company_id=Vesjd6",
            p
          )
            .then((e) => {
              o.html(n).prop("disabled", !1),
                202 === e.status
                  ? (t.find(".form-inputs").hide(),
                    t.find(".signup-success").fadeIn(),
                    o.attr("disabled", ""))
                  : (console.error("Error Klaviyo: ", e.errors),
                    t.find(".form-inputs").hide(),
                    t.find(".signup-failure").fadeIn());
            })
            .catch((e) => {
              console.log(e),
                t.find(".form-inputs").hide(),
                t.find(".signup-failure").html(e).fadeIn();
            });
        } else s.css("border", "1px solid red");
      }),
      $(".js-show-video-overlay").on("click", function () {
        const t = S(this),
          a = $(this).attr("data-embed-id"),
          s = $(t).find(".js-player").attr("data-plyr-embed-id", a),
          o = new Plyr(s, {
            muted: 0,
            autoplay: e ? 0 : 1,
            playsinline: 1,
            modestbranding: 1,
            showinfo: 0,
            allowfullscreen: 1,
            youtube: {
              noCookie: !1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              playsinline: 1,
              modestbranding: 1,
              allowfullscreen: 1,
              autoplay: 0,
              ecver: 2,
            },
          });
        e ||
          o.on("ready", () => {
            o.play();
          }),
          $(".video-overlay-content").on("click.closePlayer", function (e) {
            0 == $(e.target).closest(".plyr").length &&
              (_(o), $(".video-overlay-content").off("click.closePlayer"));
          }),
          $(".js-close-video-overlay").one("click", function () {
            _(o);
          }),
          $(document).on("keyup", function (e) {
            27 === e.keyCode && _(o);
          });
      }),

      
      $(".styled-select").selectric(),
      $("#col-main select").selectric();
    var A = $(".js-before-after-wrap");
    function I(e) {
      const t = document.cookie,
        a = `${e}=`;
      let s = t.indexOf(`; ${a}`);
      if (-1 == s) {
        if (((s = t.indexOf(a)), 0 != s)) return null;
      } else {
        s += 2;
        var o = document.cookie.indexOf(";", s);
        -1 == o && (o = t.length);
      }
      return decodeURI(t.substring(s + a.length, o));
    }
    function O(e, t = 30) {
      const a = new Date();
      a.setTime(+a + 864e5 * t),
        (window.document.cookie = `${e}=no; expires='${a.toGMTString()}; path=/`);
    }
    function M(e) {
      1 == e
        ? $(".js-search-bar .search-submit-btn").addClass("active-search")
        : $(".js-search-bar .search-submit-btn").removeClass("active-search");
    }
    function L() {
      $(
        ".js-results-products, .js-results-pages, .js-results-posts, .js-suggestions, .js-popular-terms"
      ).hide(),
        $(
          ".js-results-products, .js-results-pages, .js-results-posts, .js-suggestions"
        )
          .find(".js-list")
          .html("");
    }
    function B(e, t, a) {
      if (e.length > 0) {
        $(t).show();
        for (var s = 0, o = 0; o < e.length; o++) {
          var n = e[o],
            i = n.tags;
          if (!i || (!i.includes("sample") && !i.includes("no_search"))) {
            if ("article" == a)
              var r = `<li class="bestsellers-caps"><a href="${n.url}"><p class="small-caps article-title">${n.title}</p>`;
            else if ("page" == a)
              r = `<li class="bestsellers-caps"><a href="${n.url}">${n.title}</a></li>`;
            else {
              if (s < 5) {
                $(".js-suggestions").show();
                var l = `<li class="bestsellers-caps"><a href="${n.url}"><p class="small-caps article-title">${n.title}</p>`;
                $(".js-suggestions").find(".js-list").append(l), s++;
              }
              r = `\n          <li class="product search-animate-in">\n            <a class="image-wrap" href="${n.url}">\n              <div class="cropped-image-wrapper ">\n                <img class="lazyload fade-in" src="${n.featured_image.url}" width="100" alt="${n.title}" />\n              </div>\n              <div class="product-info">\n                <p class="product-title">${n.title}</p>\n                <p class="variant-info">$ ${n.price}</p>\n              </div>\n            </a>\n          </li>`;
            }
            $(t).find(".js-list").append(r);
          }
        }
      }
    }
    $(".js-before-after-trigger").on("touchstart mousedown", function (e) {
      e.preventDefault(),
        A.removeClass("reverse-swap-images"),
        A.addClass("swap-images");
    }),
      $(".js-before-after-trigger").on("touchend mouseup", function (e) {
        e.preventDefault(),
          A.addClass("reverse-swap-images"),
          A.removeClass("swap-images"),
          setTimeout(function () {
            A.removeClass("reverse-swap-images");
          }, 800);
      }),
      $("#inquiry-type").on("change", function () {
        var e = $(this).val();
        $("[data-contact-section]").hide(),
          $('[data-contact-section="' + e + '"]').fadeIn(400);
      }),
      $(".js-scroll-to").on("click", function (e) {
        e.preventDefault();
        var t = $(this).attr("href");
        if ("#bottom" == t)
          var a =
            $("#top").offset().top +
            $("#top").outerHeight() -
            $(window).height();
        else a = $(t).offset().top;
        $("html, body").animate({ scrollTop: a }, 600);
      }),
      null === I("accepts-cookies") && $("body").addClass("open-gdpr"),
      $(".js-close-gdpr").on("click", function () {
        $("body").removeClass("open-gdpr"), O("accepts-cookies");
      }),
      $(".js-follow-cursor").length > 0 &&
        (function () {
          for (
            var e = document.querySelectorAll(".js-follow-cursor"),
              t = [],
              a = 0;
            a < e.length;
            a++
          )
            t.push(o(e[a]));
          function s() {
            for (var e = 0; e < t.length; e++) t[e].bounds = null;
          }
          function o(e) {
            var t = null,
              a = e.querySelectorAll(".follower"),
              s = { bounds: null, x: 0, y: 0 };
            function o() {
              TweenLite.to(a, 0.3, { x: s.x, y: s.y }), (t = null);
            }
            return (
              TweenLite.set(a, { xPercent: -50, yPercent: -50 }),
              e.addEventListener("mousemove", function (a) {
                null == s.bounds && (s.bounds = e.getBoundingClientRect()),
                  (s.x = a.clientX - s.bounds.left),
                  (s.y = a.clientY - s.bounds.top),
                  t || (t = requestAnimationFrame(o));
              }),
              e.addEventListener("mouseenter", function () {
                $(this).find(".follower").addClass("animate");
              }),
              e.addEventListener("mouseleave", function () {
                $(this).find(".follower").removeClass("animate");
              }),
              s
            );
          }
          window.addEventListener("resize", s),
            window.addEventListener("scroll", s);
        })(),
      $(".search-drawer").on("click", ".js-populate-search", function () {
        const e = $(this).text().trim();
        $(".js-search-form input").val(e),
          $(".js-search-form").trigger("submit");
      }),
      $(".js-search").on("keyup", function () {
        var e = $(this).val();
        e.length
          ? ($("#search-drawer").addClass("has-active-results"),
            (function (e) {
              const t = ["sample"],
                a = ["sample", "samples", "no_search"];
              dataLayer.push({ search_query: e }),
                $.getJSON("/search/suggest.json", {
                  q: e,
                  resources: {
                    type: "product,page,article",
                    limit: 10,
                    options: {
                      unavailable_products: "last",
                      fields:
                        "title,body,product_type,variants.title,tag,variants.sku",
                    },
                  },
                }).done(function (s) {
                  const o = s.resources.results,
                    n = o.products.filter(
                      (e) =>
                        !e.tags.some((e) => a.includes(e)) &&
                        !t.includes(e.type.toLowerCase())
                    ),
                    i = o.pages,
                    r = o.articles || [];
                  L(),
                    0 == n.length && 0 == i.length && 0 == r.length
                      ? ((function (e) {
                          $(".js-empty-state").fadeIn(),
                            $(".js-empty-state").html(
                              "Sorry, nothing found for " + e + "."
                            ),
                            $(".js-results-list, .js-suggestions").hide(),
                            $(".js-popular-terms").fadeIn();
                        })(e),
                        M(!1))
                      : ($(".js-empty-state").hide(),
                        $(".js-results-list").show(),
                        B(n, ".js-results-products", "product"),
                        B(i, ".js-results-pages", "page"),
                        B(r, ".js-results-posts", "article"),
                        M(!0)),
                    $(".js-search-dropdown").addClass("active-search");
                });
            })(e))
          : (L(),
            M(!1),
            $(".js-search-dropdown").removeClass("active-search"),
            $(".js-popular-terms").fadeIn());
      });
    var z = document.links;
    for (let R = 0, q = z.length; R < q; R++)
      z[R].hostname !== window.location.hostname &&
        ((z[R].target = "_blank"), (z[R].rel = "noreferrer noopener"));
    function D(e) {
      var t = [];
      $('[name="id"] option[data-option-one="' + e.val() + '"]').each(
        function () {
          t.push(e.attr("data-option-two"));
        }
      ),
        $(".size-selector option").each(function () {
          t.includes($(this).val())
            ? $(this).removeClass("hide")
            : $(this).addClass("hide");
        }),
        $(
          ".size-selector option[value='" + $(".size-selector").val() + "']"
        ).hasClass("hide") &&
          $(".size-selector")
            .val($(".size-selector option:not(.hide)").first().val())
            .trigger("change");
    }
    if (
      (ScrollTrigger.refresh(),
      -1 === location.search.indexOf("sms-campaign") ||
        I("sms-campaign") ||
        (O("sms-campaign", "true"),
        history.pushState(null, null, location.origin + location.pathname)),
      $(".color-swatch").on("change", function (e) {
        const t = $(this)
          .find('option[value="' + $(this).val() + '"]')
          .attr("data-var");
        $.ajax({
          url: location.pathname + "?variant=" + t + "&view=ajax",
          dataType: "html",
          error: function () {},
        }).done(function (e) {
          $(".image-col").remove(),
            $(".product-lead-content").prepend($(e)),
            new Swiper(".swiper-container-pdp-mobile", {
              navigation: {
                nextEl: ".swiper-next-text",
                prevEl: ".swiper-prev-text",
              },
              speed: 600,
              allowTouchMove: !0,
              loop: !0,
            });
        });
      }),
      D($(".variant-selector")),
      $(".variant-selector").on("change", function () {
        D($(this));
      }),
      (function () {
        const e = document.getElementById("shopify-section-collection");
        if (
          (("collection" === window.theme.current_page ||
            window.location.pathname.includes("/collections/")) &&
            window.isCollectionFlow &&
            (window.hasInvitedHash || window.hasCollectionFlowCookie
              ? (O(window.collectionFlowCookie, 9999),
                e && (e.style.opacity = 1),
                e && (e.style.visibility = "visible"))
              : (e && (e.style.opacity = 0),
                e && (e.style.visibility = "hidden"))),
          "" !== $(".overlay-content[data-overlay-auto]"))
        ) {
          const t = $(".overlay-content[data-overlay-auto]").first(),
            a = t.find("form"),
            s = t.attr("data-section"),
            o = t.attr("data-overlay-auto");
          let n = null;
          if (
            (a.length && (n = a[0].elements.cookie_name),
            !t.length || I(s) || (n && I(n.value)))
          )
            return;
          "" !== o
            ? setTimeout(() => {
                S(t);
              }, o)
            : S(t),
            a.on("submit", function (t) {
              t.preventDefault();
              const a = $(this),
                o = a.attr("data-secret-collection"),
                i = Array.from(a[0].elements).find((e) => "email" === e.type),
                r = a.attr("data-list-id"),
                l = Object.keys(a[0].elements)
                  .filter((e) => e.includes("$fields"))
                  .map((e) => {
                    const t = a[0].elements[e];
                    return {
                      name: "$" + e.match(/\w+/g)[1],
                      value: "checkbox" === t.type ? t.checked : t.value,
                    };
                  }),
                c = l.map((e) => e.name).join(","),
                d = l.map((e) => ({ [e.name]: e.value })),
                p = {
                  g: r,
                  $timezone_offset: Math.abs(
                    new Date().getTimezoneOffset() / 60
                  ),
                  $fields: c,
                },
                u = Object.assign({}, p, ...d);
              (n = a[0].elements.cookie_name),
                i.value.length || !i
                  ? $.ajax({
                      method: "POST",
                      url: "https://a.klaviyo.com/ajax/subscriptions/subscribe",
                      data: u,
                    })
                      .done(function (t) {
                        t.success
                          ? (a.find(".form-inputs").hide(),
                            a.find(".signup-success").fadeIn(),
                            a.find('button[type="submit"]').hide(),
                            "" !== s && O(s, 9999),
                            "" !== o &&
                              n &&
                              n.value &&
                              (O(n.value, 9999),
                              e &&
                                (e && (e.style.opacity = 1),
                                e && (e.style.visibility = "visible")),
                              $(".form-popup__content .hd-3", a).hide(),
                              $(".form-popup__content .desk", a).hide(),
                              setTimeout(() => {
                                E();
                              }, 3e3)))
                          : (console.error("Error Klaviyo: ", t.errors),
                            a.find(".form-inputs").hide(),
                            a.find(".signup-failure").fadeIn());
                      })
                      .fail(function (e) {
                        a.find(".form-inputs").hide(),
                          a.find(".signup-failure").html(e).fadeIn(),
                          setTimeout(() => {
                            a.find(".form-inputs").show(),
                              a.find(".signup-failure").hide();
                          }, 5e3);
                      })
                  : i.focus();
            });
        }
      })(),
      new URLSearchParams(location.search).has("cart"))
    ) {
      var F = new URLSearchParams(location.search);
      F.delete("cart"),
        history.replaceState(
          null,
          null,
          location.href.replace(location.search, "?" + F)
        ),
        $(".nav-cart-icon").click();
    }
    $('[href*="#open-gdpr-preference"]').on("click", function (e) {
      window.showPreferences && (e.preventDefault(), window.showPreferences());
    });
  });
