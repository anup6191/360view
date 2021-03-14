var product, product1;
var currentType = "charcoal-silverresin-antiquegold";
var doubleClicked = false;
var DELAY = 700,
  clicks = 0,
  timer = null;
var isImageZoomed = false;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var woodFinish = "charcoal";
var doorFinish = "silverresin";
var baseMetalFinish = "antiquegold";
var test="test";
//var isMobile = true;
$(document).ready(function () {

  product = $('#product').TreeSixtyImageRotate({
    totalFrames: 22,
    endFrame: 0,
    currentFrame: 6,
    extension: ".jpg",
    imagesFolder: "images/" + currentType + "/",
    smallWidth: 400,
    smallHeight: 400,
    largeWidth: 800,
    largeHeight: 800,
    navigation: true,
    imagePlaceholderClass: "images-placeholder"
  });

  product.initTreeSixty();

  $(".frameImages").each(function (index, item) {
    var value = $(item).attr("data-value");
    $(item).prop("src", "images/" + currentType + "/" + value + ".jpg");
  });

  if (isMobile) {
    $('.images-list').find('li').each(function (index, item) {
      $(item).on('touchend', function (event) {
        StopZoom();
      });

    });
  } else {
    $('.images-list').find('li').each(function (index, item) {
      $(item).zoom({
        on: 'click'
      });

    });
  }


  $("#woodFinish :radio").click(function () {
    woodFinish = $(this).attr("data-name");

    console.log(currentType);
    ChangeImage(woodFinish + "-" + doorFinish + "-" + baseMetalFinish);
  });
  $("#doorFinish :radio").click(function () {
    doorFinish = $(this).attr("data-name");
    //alert(doorFinish);
    console.log(currentType);
    ChangeImage(woodFinish + "-" + doorFinish + "-" + baseMetalFinish);
  });
  $("#baseMetalFinish :radio").click(function () {
    baseMetalFinish = $(this).attr("data-name");

    console.log(currentType);
    ChangeImage(woodFinish + "-" + doorFinish + "-" + baseMetalFinish);
  });
  // $(".expand").click(function () {

  //   product.togleFullScreen();
  //   $("#resizeSmallIcon").css("display", "block");
  // });
  // $("#resizeSmallIcon").click(function () {

  //   product.togleFullScreen();
  //   $("#resizeSmallIcon").css("display", "none");
  // });

  $("#zoomImage").on("mousedown touchstart", function (e) {
    StartZoom();
    // base.resize();
  });
  $(".img-list").find('img').on("mousedown touchstart", function (e) {
    MoveAnimation($(this).attr("data-value"));
    $(this).parent().children().removeClass('active');
    $(this).addClass('active');
  });
  $(".expand").on("mousedown touchstart", function (e) {
    product.togleFullScreen();
    $("#resizeSmallIcon").css("display", "block");
  });
  $("#resizeSmallIcon").on("mousedown touchstart", function (e) {
    product.togleFullScreen();
    $("#resizeSmallIcon").css("display", "none");
  });

  $("#resizeSmallIcon").css("display", "none");
  $(".img-list").find("[data-value='" + 0 + "']").addClass("active");
});

function ChangeImage(type) {
  console.log(type);
  if (currentType == type) {
    //alert("same");
    return;
  }
  var previousProduct = $("#product");
  var currentFrame = parseInt(previousProduct.find(".active").attr("class").split(/\s+/)[1].substring(6));
  //  alert(currentFrame);
  var newProductHTML = $("<div>").attr("id", "product").addClass("threesixty-image-rotate product");
  $(newProductHTML).insertBefore($(".bottom-navigation"));
  //$(previousProduct).html($(newProductHTML));

  var settings = {
    totalFrames: 22,
    endFrame: 0,
    currentFrame: 0,
    extension: ".jpg",
    imagesFolder: "images",
    smallWidth: 400,
    smallHeight: 400,
    largeWidth: 800,
    largeHeight: 800,
    navigation: true,
    imagePlaceholderClass: "images-placeholder"
  };


  currentType = woodFinish + "-" + doorFinish + "-" + baseMetalFinish;
  settings.imagesFolder = "images/" + currentType + "/";
  $(".frameImages").each(function (index, item) {
    var value = $(item).attr("data-value");
    $(item).prop("src", settings.imagesFolder + value + ".jpg");
  });

  product = $(newProductHTML).TreeSixtyImageRotate(settings);
  product.initTreeSixty();

  if (currentFrame != 0) {
    let e = product.find(".active"),

      a = currentFrame;

    let s = "image-" + a;
    product.find("." + s).addClass("active"), e.removeClass("active");
  }
  //$(previousProduct).html($(newProductHTML));
  $(previousProduct).remove();
  // $(".bottom-navigation").css("display","none");
  // $('.images-list').find('.active').zoom({ on:'click' });
  if (isMobile) {
    $('.images-list').find('li').each(function (index, item) {
      $(item).on('touchend', function (event) {
        StopZoom();
      });

    });
  } else {
    $('.images-list').find('li').each(function (index, item) {
      $(item).zoom({
        on: 'click'
      });
    });
  }
  // $(".img-list").find('img').on("mousedown touchstart", function (e) {

  //   MoveAnimation($(this).attr("data-value"));
  // });
  $(".expand").on("mousedown touchstart", function (e) {

    product.togleFullScreen();
    $("#resizeSmallIcon").css("display", "block");
  });
  $("#resizeSmallIcon").on("mousedown touchstart", function (e) {

    product.togleFullScreen();
    $("#resizeSmallIcon").css("display", "none");
  });
  $("#resizeSmallIcon").css("display", "none");
  // $(".bottom-navigation").css("display","block");
  $(".img-list").find("[data-value='" + 0 + "']").addClass("active");

}

function MoveAnimation(targetFrame) {

  var currentFrame = parseInt(product.find(".active").attr("class").split(/\s+/)[1].substring(6));
  if (currentFrame == targetFrame) {
    return;
  }
  var totalFrameToMove = currentFrame > targetFrame ? currentFrame - targetFrame : targetFrame - currentFrame;
  console.log(totalFrameToMove);
  Move();
  var i = 0;

  function Move() {
    setTimeout(function () { //  call a 3s setTimeout when the loop is called

      i++;
      if (currentFrame > targetFrame) {
        currentFrame--;
      } else {
        currentFrame++;
      }
      let e = product.find(".active"),
        t = e.attr("class").split(/\s+/)[1],
        a = currentFrame;

      let s = "image-" + a;
      product.find("." + s).addClass("active"), e.removeClass("active");

      console.log("curr frame " + currentFrame);

      if (i < totalFrameToMove) {
        Move();
      }
    }, 20)

  }

}

function StartZoom() {
  $('.images-list').find('.active').zoom({
    on: "mouseover"
  });
  isImageZoomed = true; // comment in case of single tap
}

function StopZoom() {
  $('.images-list').find('.active').trigger('zoom.destroy');
  isImageZoomed = false; // comment in case of double tap
}