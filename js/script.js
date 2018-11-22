document.addEventListener("touchstart", function(){}, true);

$('.product-card__info').click(function(){
  $(this).parents('.product-card').toggleClass('info').removeClass('download');
});
$('.product-card__download').click(function(){
  $(this).parents('.product-card,.download-block').toggleClass('download');
});

$(function(){
  $(window).scroll(function(){
    var winTop = $(window).scrollTop();
    if(winTop >= 400){
      $(".pagename-main").addClass("sticky-category");
    }else{
      $(".pagename-main").removeClass("sticky-category");
      if ($('.pagename-main').find('.category-dropdown').hasClass('active')) {
      $('.pagename-main').find('.category-dropdown.active').removeClass('active');
      }
    }
  });
});

// document ready
$(document).ready(function(){
  $('.recommended-slider').each(function(){
    $(this).slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-right"></i></button>',
    });
  });
  $('.card-slider__list').each(function(){
    $(this).slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      appendArrows:$(this).parents('.card-slider').find('.card-slider__control'),
      prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1170,
          settings: {
            slidesToShow: 2,
            appendArrows:$(this).parents('.card-slider').find('.tablet-arrow'),
          }
        }
      ],
    });
  });
  $('.directions-tabs__slider').each(function(){
    $(this).slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      appendArrows:$(this).parents('.directions-content').find('.arrow'),
      prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
      nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 1170,
          settings: {
            slidesToShow: 2
          }
        }
      ],
    });
  });
  $('.wrap-drop').each(function(key,item){
  var selectedText = $(item).find('.selected').text();
    $(item).find('.selected-el span').text(selectedText);
});

  $('.wrap-drop').on('click','.drop>li',function(){
      var thisText = $(this).text()
      $(this).addClass('selected').siblings().removeClass('selected');
      $(this).parents('.wrap-drop').find('.selected-el span').text(thisText);
    });
$('.wrap-drop').on('click', function(){
    $(this).toggleClass('active');
  });
});

  // var tabsButtonWidth = $('.news-tabs__content').width();
  // var tabsButtonRealWidth = $('.news-tabs__content')[0].scrollWidth;
  // $(document).on('scroll','.news-tabs__content', function(){
  //   $('.overflow-arrow').removeClass('active');
  // });
  // if (tabsButtonRealWidth > tabsButtonWidth){
  //   $('.overflow-arrow').addClass('active');
  // };

// paralax slider

  var sliderItemLenght = $('.main-block__slider .slider-item').length;
  var itemCalc = 100/sliderItemLenght;

  $('.main-block__info').on('click', '.slick-arrow' , function(){
      var dotsIndex = $('.main-block__info .slick-dots li.slick-active').index();
      var amount = dotsIndex*itemCalc;
          $(this).parents('.main-block__info').css({'background-position': ''+amount+'% 50%'});
    });
    $('.main-block__info').on('click' , '.slick-dots li', function(){
      var dotsIndex = $(this).index();
      var amount = dotsIndex*itemCalc;
      $(this).parents('.main-block__info').css({'background-position': ''+amount+'% 50%'});
    });

  $('.main-block__slider').on('swipe', function(event, slick, direction){
    var dotsIndex = $('.main-block__info .slick-dots li.slick-active').index();
    var amount = dotsIndex*itemCalc;
        $(this).parents('.main-block__info').css({'background-position': ''+amount+'% 50%'});
  });
  //

function initSlick(rootNode, options) {
    var defaults = {
        arrows:true,
        dots: false,
        prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-right"></i></button>',
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 3,
    }

    for (var option in options) {
        defaults[option] = options[option];
    }

    $(rootNode).slick(defaults);
}

var slickMap = [{
    node: '.main-block__slider',
    options: {
      arrows:true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 600,
    }
},{
    node: '.product-image__slider',
    options: {
      arrows:true,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 300,
      dots: false,
      focusOnSelect: true
    }
}
];

slickMap.forEach(function(slick){
    initSlick(slick.node, slick.options)
});

$('.footer-social .button .text').click(function(){
  $(this).parent().toggleClass('active');
});

$('.directions-content__button').click(function(){

  var idOfEl = $(this).attr('id');
  $('.directions-content__button , .tabs-card').removeClass('active');
  $('.tabs-card[data-target='+idOfEl+']').addClass('active').siblings().removeClass('active');
  $(this).addClass('active');
});

$('.directions-nav__button ,.news-tabs__button').click(function(){
  $(this).addClass('active').siblings().removeClass('active');
  var idOfEl = $(this).attr('id');
  var targetEl =  $('.directions-content[data-target='+idOfEl+'] ,.news-content[data-target='+idOfEl+']');
  targetEl.addClass('active').siblings().removeClass('active');
});

$('.form-holder__btn').click(function(){
  $(this).parent().toggleClass('active');
  $('.header-content__contacts').removeClass('call');
});

$('.js-call__back').click(function(){
  $(this).parents('.call-back__tablet').removeClass("active");
  $('.header-content__contacts').toggleClass('call');
  $('.form-holder').removeClass('active');

});


  $(document).on('click', function(event){
    var if_neededelement = $(event.target).parent('.call-back__form').length;
    var if_thisbutton = $(event.target).hasClass('js-call__back')? true: $(event.target).parents('.js-call__back').length > 0? true: false;
   
    if(!if_thisbutton && !if_neededelement){
      $('.header-content__contacts').removeClass('call');
    }

  });

$('.info-dropdown .tablet-button').click(function(){
  $(this).parents('.info-dropdown').toggleClass('active');
});

$('.dropdown-menu').click(function(){
  $(this).toggleClass('active');
  $('.header-content .category-dropdown').toggleClass('active');
});

$('.js-call__tablet').click(function(){
  $('.call-back__tablet').toggleClass('active');
  $('.modal-tablet').removeClass('active');
});
$('.js-dropdown__email').click(function(){
  $('.modal-tablet').toggleClass('active');
  $('.call-back__tablet').removeClass('active');
})
$('.js-modal__questions').click(function(){
  $(this).parents('.contacts-tablet__dropdown').removeClass("active");
  $('.modal-questions').addClass('active');
  $('body').addClass('overflow');
});

$('.product-card .ask').click(function(event){
  event.preventDefault();
  var modalText = $(this).parents('.product-card').find('.product-card__content .link').text();
  $('.modal-ask__price .current-modification__text').html(modalText);
  $('.modal-ask__price').addClass('active');
  $('body').addClass('overflow');
});

$('.product-content__bottom .ask').click(function(event){
  event.preventDefault();
  var modalText = $('.js-name.active .selected-el').text();
  $('.modal-ask__price .current-modification__text').html(modalText);
  $('.modal-ask__price').addClass('active');
  $('body').addClass('overflow');
});
$('.modal .close').click(function(){
  $(this).parents('.modal').removeClass('active');
  $('body').removeClass('overflow');
});
$('.social-fixed__mobile').click(function(){
  $(this).parent().toggleClass('active');
});
$('.ajax-show__more').click(function(){
  $('.pagination-el.active').removeClass('active').next('.pagination-el').addClass('active');
  
  var items = $('.news-content.active .news-card').clone();
  $(items).removeClass('active');

  var stepList = 150;
  $(items).each(function(key, item){
    setTimeout (function(){
      $('.news-content.active .wrapper').append(item);
      setTimeout (function(){
        $(item).addClass('active');
      },150);
    },(stepList*key));
  });
});



// catalogue filters
function selectedFilter(){
  var selectedFilterLenght = $(document).find('.checked-filters__list .checked-filters__item').length;
  $('.filters__left .checked-num').text('+'+ selectedFilterLenght);
    if(selectedFilterLenght !==0){
      $('.checked-filters').addClass('active');
      $('.filters__left .checked-num').show();
      $('.filters__left').attr('style','background: #eaeaea !important');
    }else{
      $('.filters__left .checked-num').hide();
      $('.checked-filters').removeClass('active');
      $('.filters__left').css({'background':"#f9f9f9"});
    }
  };
selectedFilter();


$('.filer-block__item input').click( function(){
  var checked = $(this).prop("checked");
  var inputName = $(this).attr('name');
  var appendParent = $('.aside .checked-filters__list');
  var filterText = $(this).parents('.filer-block__item').find('.text').text();

  var appendList = '<li class="checked-filters__item" data-target='+inputName+'>\
                        <span class="remove-filter"><i class="fas fa-times"></i></span>\
                        <span class="text">'+filterText+'</span></li>';
  if(checked){
    appendParent.append(appendList);
  }else{
    $('.checked-filters__item[data-target='+inputName+']').remove();
  };
  selectedFilter();
});



$(document).on('click','.checked-filters__item .remove-filter',function(){
  var thisAttr = $(this).parents(".checked-filters__item").attr('data-target');
  $('.filer-block__item input[name='+thisAttr+']').prop('checked', false);
  $(this).parents('.checked-filters__item').remove();
  selectedFilter();


    var inputLeftVal = parseFloat($('.range-slider#'+thisAttr+'').find('.input-left').val());
    var inputRightVal = parseFloat($('.range-slider#'+thisAttr+'').find('.input-right').val());


    var minAttr = $('.range-slider#'+thisAttr+'').attr('data-min');
    var maxAttr = $('.range-slider#'+thisAttr+'').attr('data-max');

    $('.range-slider#'+thisAttr+'').find('.input-left').val(minAttr);
    $('.range-slider#'+thisAttr+'').find('.input-right').val(maxAttr);
    $('.range-slider#'+thisAttr+'').find(".slider-range").slider({
        values: [minAttr , maxAttr]
      });
});

$('.checked-filters__clear .button').click(function(){
  // $(this).parents('.checked-filters__list').find('.checked-filters__item').remove();
  $(document).find('.checked-filters__list .checked-filters__item').remove();
  $('.filer-block__item').each(function(){
    $(this).find('input').prop('checked', false);
  })
  selectedFilter();

    var inputLeftVal = parseFloat($('.range-slider').find('.input-left').val());
    var inputRightVal = parseFloat($('.range-slider').find('.input-right').val());


    var minAttr = $('.range-slider').attr('data-min');
    var maxAttr = $('.range-slider').attr('data-max');
    $('.range-slider').find('.input-left').val(minAttr);
    $('.range-slider').find('.input-right').val(maxAttr);

    $('.range-slider').find(".slider-range").slider({
        values: [minAttr , maxAttr]
      });
});

$('.filer-block__more').click(function(){
  $(this).parents('.content-holder').toggleClass('active');
});
$('.filer-block__title').click(function(){
  $(this).parents('.filer-block').toggleClass('active');
});
$('.filer-block').each(function(){
  var filterItemLenght = $(this).find('.filer-block__item').length;
  var thisButton = $(this).find('.filer-block__more');
  if (filterItemLenght > 3) {
    thisButton.show();
  }else{
    thisButton.hide();
  }
});


$('.sort-button--js').click(function(){
  var buttonID = $(this).attr('id');
  $('.sort-button--js').removeClass('active');
  $(this).addClass('active');
  $('.catalogue__content').removeClass('active');
  $('.catalogue__content[data-target='+buttonID+']').addClass('active');
});

$('.filters__left').click(function(){
  $('.aside').toggleClass('active');
});

//price slider 
$(document).ready(function(){
  $( function() {

  $(".range-slider").each(function(key, item){
    var slider = $(item).find(".slider-range");
    // var labelInput = $(item).find(".label_input");
    var inputLeft = $(item).find('.input-left');
    var inputRight = $(item).find('.input-right');
    
    var sliderMinValue = parseFloat($(item).attr('data-min'));
    var sliderMaxValue = parseFloat($(item).attr('data-max'));
    $(slider).slider({
        range: true,
        swipe:true,
        min: sliderMinValue,
        max: sliderMaxValue,
        values: [ sliderMinValue,  sliderMaxValue],
        slide: function( event, ui ) {
          $(inputLeft).val(ui.values[0]);
          $(inputRight).val(ui.values[1]);
        }
    });
    
    var baseFrom = $(slider).slider("values", 0);
    var baseTo = $(slider).slider("values", 1);
    $(inputLeft).val(baseFrom);
    $(inputRight).val(baseTo);

      var inputLeftCurrent = parseFloat($(item).find('.input-left').val());
      var inputRightCurrent = parseFloat($(item).find('.input-right').val());
      $('.input-left').on('change', function(){
        var inputLeftVal = parseFloat($(item).find('.input-left').val());
        var inputRightVal = parseFloat($(item).find('.input-right').val());
        var thisVal = $(this).val();
        $(item).find(".slider-range").slider({
          values: [ inputLeftVal, inputRightVal ]
        });
        
        if (thisVal > sliderMaxValue || thisVal > sliderMaxValue ) {
          $(this).val(sliderMaxValue);
        } else if(thisVal < sliderMinValue){
          $(this).val(sliderMinValue);
        }
        if (thisVal > inputRightCurrent || thisVal > inputRightVal && thisVal > sliderMaxValue){
           inputLeft.val(inputRightVal);
           $(item).find(".slider-range").slider({
            values: [inputRightVal ,inputRightVal]
          });
        };
      });
      $('.input-right').on('change', function(){
        var inputLeftVal = parseFloat($(item).find('.input-left').val());
        var inputRightVal = parseFloat($(item).find('.input-right').val());
        var thisVal = $(this).val();
        $(item).find(".slider-range").slider({
          values: [ inputLeftVal, inputRightVal ]
        });
        if (thisVal < inputLeftCurrent || thisVal < inputLeftVal){
           inputRight.val(inputLeftVal);
           $(item).find(".slider-range").slider({
            values: [inputLeftVal ,inputLeftVal]
          });
        };
        if (thisVal > sliderMaxValue || thisVal > sliderMaxValue ) {
          $(this).val(sliderMaxValue);
        };
      });

      function addRangeFilter(){
        
        var appendParent = $('.aside .checked-filters__list');
        var inputLeftVal = parseFloat($(item).find('.input-left').val());
        var inputRightVal = parseFloat($(item).find('.input-right').val());
        var parentsID = $(item).attr('id');
        var rangeFilter = $(item).parents('.filer-block').find('.filer-block__title').text();

        var tt = '<span class="remove-filter"><i class="fas fa-times"></i></span>\
                      <span class="text">'+rangeFilter+' : ' +inputLeftVal+' - ' +inputRightVal+ '</span>';

        var appendList = '<li class="checked-filters__item" data-target='+parentsID+'>'+tt+'</li>';
        
        var findRangeFilter  = $(document).find('.checked-filters__item[data-target="'+parentsID+'"]');
        
        if( $(findRangeFilter).length <= 0 )
          appendParent.append(appendList);
        else
         findRangeFilter.html(tt);
      };

      $('.input-value').on('change',function(){
          addRangeFilter();
          selectedFilter();
      });
      $(item).find(".slider-range").slider({
        stop: function( event, ui ) {
          addRangeFilter();
          selectedFilter();
        }
      });
  });
});
})
$('.input-value ,.calc-block .num').on('keyup',function(e){
  $(this).val($(this).val().replace( /[^\d]/g ,'')); 
});


function ProductLargeImg(){
  var smallCurentSrc = $('.product-image__slider .slick-current img').attr('src');
  $('.product-image__large img').attr('src',smallCurentSrc)
}
function sliderAnimation(){

  $('.product-image__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.product-image__large').addClass('active');
  });
  
    setTimeout(function() {
      $('.product-image__large').removeClass('active');
    }, 500);
};
ProductLargeImg();
 var sliderButton = $('.product-image__slider .slick-arrow');
 sliderButton.click(function(){
  ProductLargeImg();
  sliderAnimation();
});

 var fakeSliderLeftButton = $(".product-image__large .button__left");
 var fakeSliderRightButton = $(".product-image__large .button__right");
 var realLeftButton = $('.product-image__slider .slick-prev');
 var realRightButton = $('.product-image__slider .slick-next');
 var sliderContent = $('.slick-slide');

  fakeSliderLeftButton.click(function(){
    realLeftButton.click();
    ProductLargeImg();
    sliderAnimation();
  });
  fakeSliderRightButton.click(function(){
    realRightButton.click();
    sliderAnimation();
  });
 sliderContent.click(function(event){
  // if($(this).is('.slick-current')){
  //   console.log('123')
  //   event.preventDefault();
  // }
  ProductLargeImg();
  sliderAnimation()
 });

// remove button from Large img when small slide < 3el
function btnCheck(){
  var imgLenght = $('.product-image__slider').find('.slider-content').length;
  if (imgLenght < 4)
    $('.product-image__large .button').hide();
  else
    $('.product-image__large .button').show();
  
};

btnCheck();


$('.show-more .button').click(function(){
  $('.characteristics-list').toggleClass('active');
})

$('.block-button').click(function(){
  $(this).parents('.solutions-sidebar__block').toggleClass('active');
});

$('.price-table__buttons .order').click(function(){
  $('.cart-block').addClass('order');
});
$('.cart-block__total .back').click(function(){
  $('.cart-block').removeClass('order');
});

$('.cart-block__total .price-table__buttons .link').click(function(){
  $('#order-info').submit();
});


$(document).ready(function(){
  var statusText = $('.personal-status__block.checked .js-text').text();
  var statusInput = $('.personal-status .personal-status__input');
  statusInput.val(statusText);
  $('.form-label .wrap-drop').each(function(key , item){
    var wrapText = $(item).find('.selected-el').text();
    var wrapInput = $(item).find('.wrap-drop__input');
    wrapInput.val(wrapText);
    $(item).on('click','.drop li' ,function(){
      var dropText = $(this).text();
      wrapInput.val(dropText);
    });
  })
})
$('.personal-status__block').click(function(){
  var thisText = $(this).find('.js-text').text();
  $(this).addClass('checked').siblings('.personal-status__block').removeClass('checked');
  $(this).parents('.personal-status').find('.personal-status__input').val(thisText);
});

















// calc input
// numberformat 
function numberWithCommas (x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}







$(document).ready(function(){
  var calcInput = $('.calc-block .num').val();

  function calcTotalItem(){
    var calcTotal = 0;
    
    $('.calc-block .num').each(function(){
      calcTotal += parseInt($(this).val());
    });
    $('.product-num,.price-table__item.quantity .num').html(calcTotal);
  };

function iffff(item){
  var itemAmount = parseInt( $(item).attr('data-amount') );
  var itemInputNum = parseInt( $(item).find('.calc-block .num').val() );

  if($(item).attr('sale-type') != ''){
    // console.log(itemInputNum);
    if(itemAmount <= itemInputNum){
      recountDiscount(item, itemInputNum);      
      $(item).addClass('hot');
    }else{
      recountPrice(item, itemInputNum);
      $(item).removeClass('hot');
    }

  }else{
    recountPrice(item, itemInputNum);
  }
}

function recountDiscount(item, itemInputNum){
  var itemPrice = parseFloat( $(item).attr('data-price') );
  var itemSaleRate = parseFloat( $(item).attr('sale-rate') );

  if($(item).attr('sale-type') == 'percent'){
    var itemTotalSale = itemInputNum * ( itemPrice *  itemSaleRate / 100 );
  }else{
    var itemTotalSale = itemInputNum * itemSaleRate;
  }

  var itemCommonPrice = (itemPrice * itemInputNum) - itemTotalSale;
  $(item).attr('data-total__price', itemCommonPrice.toFixed(2)).attr('data-total__sale', itemTotalSale.toFixed(2)).find('.cart-total__price').html(numberWithCommas(itemCommonPrice));
}

function recountPrice(item, itemInputNum){
  var itemTotalPrice = parseFloat( $(item).attr('data-price') ) * itemInputNum ;
  $(item).attr('data-total__price', itemTotalPrice.toFixed(2)).attr('data-total__sale', 0).find('.cart-total__price').html(numberWithCommas(itemTotalPrice));
}

$(document).on('click', '.calc-block .button', function(){
  iffff($(this).parents('.cart-card'));
  recountAllCarts();
  calcTotalItem();
});

$(document).on('keyup', '.calc-block .num', function(){
  var thisVal = $(this).val();
  if (thisVal == 0 ) {
    $(this).val('1');
  }else if(thisVal > 500){
    $(this).val('500');
  }
  iffff($(this).parents('.cart-card'));
  recountAllCarts();
  calcTotalItem();
});

function recountAllCarts(){
  var totalCartPrice = 0,
      totalCartSale = 0;
  $('.cart-card').each(function(key,item){
    totalCartPrice += parseFloat( $(item).attr('data-total__price') );
    totalCartSale += parseFloat( $(item).attr('data-total__sale') );
  });
  $('.price-table__item.total .num-js').html(numberWithCommas(totalCartPrice));
  $('.price-table__item.discount .num').html(numberWithCommas(totalCartSale));
  $('.cart-price__num .amount').html(numberWithCommas(totalCartPrice));
}
    // calc price , change val on input when click it
    $('.calc-block .plus').click(function(){
      calcInput = $(this).siblings('.num').val();
      calcInput++;
      $(this).parents('.cart-card').find('.calc-block .num').val(calcInput);
    });


    // calc price , change val on input when click it
    $('.calc-block .minus').click(function(){
      calcInput = $(this).siblings('.num').val();
      
      if (calcInput >= 2) {
        calcInput --;
        $(this).parents('.cart-card').find('.calc-block .num').val(calcInput);
      }
    });


  // remove cart and calc price and card amount
  $(".remove-cart").click(function(){
    var cartCardLenght = $('.cart-card').length;

    if (cartCardLenght > 0)
      $('.header-content__cart').attr('data-qantity','1');
    else
      $('.header-content__cart').attr('data-qantity','0');

    $(this).parents('.cart-card').remove();
    recountAllCarts()
    calcTotalItem();
  });

  $('.mobile-list .mobile-list__plus').click(function(){
    $(this).parents('.mobile-list').toggleClass('active');
  });

  $('.mobile-list li').click(function(){
    var thisText = $(this).text();
    $(this).parents('.mobile-list').removeClass('active').end().addClass('selected').siblings('li').removeClass('selected').end().parents('.calc-block').find('input.num').val(thisText);
    iffff($(this).parents('.cart-card'));
    recountAllCarts();
    calcTotalItem();
  });


    function checkPrice(item){
      var currentProductPrice = 0;
      var productLenght = $('.product-id__holder input').length;
      console.log(productLenght)
      $('.product-id__holder input').each(function(){
          currentProductPrice += parseFloat($(this).attr('data-price'));
      });
      $('.cart-price__quantity .product-num').html(productLenght)
      $('.cart-price__num .amount').html(numberWithCommas(currentProductPrice));

      if(productLenght >=1){
        $('.header-content__cart').attr('data-qantity','1');
      }
        
        else{
          $('.header-content__cart').attr('data-qantity','0');
        }
        
    }
    
    $('.js-card').on('click','.buy',function(){
      
      var parentsId = $(this).parents('.js-card').attr('data-id');
      var parentsPrice = $(this).parents('.js-card').attr('data-current__price');
      var htmlId = '<input type="hiden" data-price="'+parentsPrice+'" name="'+parentsId+'">'
      var htmlAppend = $('.product-id__holder');
      var checkId = $('.product-id__holder').find('input[name="'+parentsId+'"]').length;
      if (checkId == 0) {
        htmlAppend.append(htmlId);
        $(this).parents('.js-product__button').addClass('remove');
        checkPrice();
      }
    });
    
    $('.js-card').on('click','.js-product__button.remove .remove',function(){
      $(this).parents('.js-product__button').removeClass('remove');
      var parentsId = $(this).parents('.js-card').attr('data-id');
      var checkId = $('.product-id__holder').find('input[name="'+parentsId+'"]').remove();
      checkPrice();
      
    });

  // modification change
$('.product-content__middle .drop li').click(function(){
  var modificationAttr = $(this).attr('data-model');
  var obj = JSON.parse(modificationAttr);
  var productBlock = $('.product');
  var oldPriceBlock = $('.product-content__bottom .old-price__num');
  var currentPriceBlock = $('.product-content__bottom .current-price__num');
  var articleBlock = $('.article-block__text');
  var hotBlockText = $('.hot-block__text[data-type='+obj.type+']');
  var dateBlock = $('.hot-block__date');
  

  $(this).parents('.js-card').attr('data-id',obj.modificationId);
  $(this).parents('.js-card').attr('data-current__price',obj.currentPrice);

  var checkId = $('.product-id__holder').find('input[name="'+obj.modificationId+'"]').length;
  if (checkId == 1) {
    $('.js-product__button').addClass('remove');
  }else{
    $('.js-product__button').removeClass('remove');
  }


  $.each(obj.features, function(key,item){
    $('.content-spacer[data-key="'+key+'"] .js-modification__text').html(item);
  });

  currentPriceBlock.html(obj.currentPrice);
  $('.product-content__bottom').attr('data-price',obj.isPriceHiden)
  articleBlock.html(obj.article)

  if (obj.sale == 1){
     productBlock.addClass('hot');
     oldPriceBlock.html(obj.oldPrice);
     $('.hot-block__text').hide();
     hotBlockText.show().end().find('.percent').html(obj.percent).end().find('.num').html(obj.num).end().find('.link').attr('href',obj.href);
     dateBlock.html(obj.date);
  }else {
     productBlock.removeClass('hot');
  }
});



  var ifhash = window.location.hash;
  $('.product-content__middle .wrap-drop a[href="'+ifhash+'"]').click();
  $('.product-content__middle .wrap-drop.active').removeClass('active');


  $('.cart-buttons__item:first').click(function(){
    $(this).parents('.cart-block').removeClass('order');
  });
  $('.cart-buttons__item:last').click(function(){
    $(this).parents('.cart-block').addClass('order');
  });
});


