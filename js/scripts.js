$(document).ready(function() {
  //header sticky
  if ($(document).scrollTop() > $(".fixed-top").height()) {
    $(".fixed-top").toggleClass("scrolled");
  }

  $(window).on("scroll", function() {
    $(".container__header").toggleClass(
      "scrolled",
      $(this).scrollTop() > $(".container__header").height() / 2
    );
  });

  var url = document.location.href;
  $.each($(".header__link"), function() {
    if (this.href == url) {
      $(this).addClass("active");
    }
  });

  $(".header__link, .header__btn, .caption__btn").on("click", function(event) {
    event.preventDefault();
    let id = $(this).attr("href"),
      top = $(id).offset().top - 50;
    $("body,html").animate({ scrollTop: top }, 500);
    $(".burger-menu__button").removeClass("is-active");
    $(".burger-menu").removeClass("is-active");
    $(".header__nav").removeClass("is-active");
    return false;
  });
  $(".burger-menu__button").on("click", function() {
    $(".burger-menu").toggleClass("is-active");
    $(".header__nav").toggleClass("is-active");
    $(".header__top").toggleClass("is-active");
    $("body").toggleClass("is-active");
  });

  $(".banerList").slick({
    dots: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true
  });
  $(".gallery__list").slick({
    dots: true,
    arrows: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    focusOnSelect: true
  });

  $.extend($.validator.messages, {
    required: "Please, fill in the field"
  });

  $("#form__footer").validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      mes: {
        required: false
      }
    }
  });

  $(".submit").one("click", function() {
    if ($("#form__footer").valid() == true) {
      $("#form__footer").submit(function(e) {
        e.preventDefault();
        var thisForm = $(this);
        var data = new FormData(thisForm[0]);
        $.ajax({
          url: "mail.php",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          type: "POST",
          success: function() {
            alert("Message sent!");
            $("#form__footer")[0].reset();
          },
          error: function() {
            alert("Message not sent!");
            $("#form__footer")[0].reset();
          }
        });
      });
    }
  });
});
