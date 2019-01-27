$(document).ready(function(){

var documentArray = {};

$(document).on("click",".filter-card__info .text" , function (event) {
  event.preventDefault();
  var id  = $(this).attr('href'),
        top = $(id).offset().top - 30;
        $('body,html').animate({scrollTop: top}, 500);
  });
  
  var navTarget = $('.config-nav__button.active').attr('id');
  $('.config-nav__button').click(function(){
    var thisAttr = $(this).attr('id');
    $('.config-nav__button').removeClass('active');
    $(this).addClass('active');
    $('.config-tabs').removeClass('active');
    $('.config-tabs[data-target="'+thisAttr+'"]').addClass('active');
    navTarget = thisAttr;
  });
  // 
  function mobileTabsResize (){
    var activeTabIndex = $('.config-tabs.active .config-tabs__item.active').index();
    if (activeTabIndex == 1 ) {
      $('.js-tabs__holder').removeClass('last')
      $('.js-tabs__holder').addClass('first');
    }else if(activeTabIndex == 3 ){
      $('.js-tabs__holder').removeClass('first')
      $('.js-tabs__holder').addClass('last');
    }
  };
  mobileTabsResize ();
  // 
  $(document).on('click','.config-tabs__item[data-active="1"]',function(){

    $('.config-tabs[data-target='+navTarget+']').find('.config-tabs__item').removeClass('active');
    var thisId = $(this).attr('id');
    $('.config-tabs[data-target='+navTarget+']').find('.config-content').removeClass('active');
    $('.config-content[data-target='+thisId+']').addClass('active');

    $(this).addClass('active')
    var thisPosition = $(this).position(),
        index = $(this).index(),
        thisLenght = $('.config-tabs[data-target='+navTarget+']').find('.config-tabs__item').length;
        $(window).resize(function(){
           thisPosition = $(this).position();
        });
        $('.config-tabs[data-target='+navTarget+'] .active-tab__bg').css({
          "left":thisPosition.left+'px',
        });
    
    var thisActiveLenght = $('.config-tabs[data-target='+navTarget+']').find('.config-tabs__item[data-active="1"]').length;

    if(index == thisLenght){
      $('.config-tabs[data-target='+navTarget+'] .active-tab__bg').addClass('active');
      $('.visual-config__block').addClass('hidden-el');
    }else{
      $('.config-tabs[data-target='+navTarget+'] .active-tab__bg').removeClass('active');
      $('.visual-config__block').removeClass('hidden-el');
    }
    mobileTabsResize ();
  });

  $('.type-card').click(function(){
    $('.patchcord-type_js , .js-selected-patchcord').html($(this).find('.js-card-text').text());
  });


  $(document).on('click','.js-card-button',function(){
    
    var thisTitle = $(this).find('.js-card-text:not(.js-industrial-text)').text(),
        parentsTarget = $(this).parents('.config-content').attr('data-target');

    if( !$(this).hasClass('js-card-checkbox') ) {
        $(this).parents('.config-content[data-target='+parentsTarget+'],.filter-block').find('.js-card-button:not(.js-card-checkbox)').removeClass('active');
        $(this).addClass('active');
    };
    $('.config-tabs__item#'+parentsTarget+'').find('.description').html(thisTitle).end().next().attr('data-active','1');
    var checkedLength = $(document).find('.config-tabs[data-target='+navTarget+'] .config-tabs__item[data-active="1"]').length;

    if (checkedLength != 1) {
      $('.config-tabs.active .show-btn .content-holder').css({
        'cursor':'pointer'
      });
    };
  });

  $('.config-content:not(.connector) .modal-info__button ,.config-sort .modal-info__button').click(function(){
    var modalImgSrc = $(this).parents('.js-card-button').attr('data-img');
    var modalText = $(this).parents('.js-card-button').attr('data-text');
    var modalTitle = $(this).parents('.js-card-button').find('.js-card-text').text();
    $('.modal.modal-info').addClass('active').find('img').attr('src',modalImgSrc).end().find('p').html(modalText).end().find('.title').html(modalTitle);
    $('body').addClass('overflow');
  });
  
  $('.config-content.connector .modal-info__button').click(function(){
    var modalImgSrc = $(this).parents('.connector-type__block').attr('data-img');
    var modalText = $(this).parents('.connector-type__block').attr('data-text');
    var modalTitle = $(this).parents('.connector-type__block').find('.title-js').text();
    var modalTitleTextFirst = $(this).parents('.connector-type__block').find('.connector-dropdown .selected').text();
    var modalTitleTextSecond = "";
    $(this).parents('.connector-type__block').find('.polishing-dropdown li').each(function(key, item){
      var thisEl = $(this).text();
      var slesh = (key == 0)? '': ' / ';
      modalTitleTextSecond += slesh+thisEl;
    });
    $('.modal.modal-info').addClass('active').find('img').attr('src',modalImgSrc).end().find('p').html(modalText).end().find('.title').html(modalTitle+': '+modalTitleTextFirst+' - '+modalTitleTextSecond);
    
    $('body').addClass('overflow');
  });

 $('.wrap-drop.connector-dropdown .drop>li').on('click',function(){
  var thisEl = $(this);
  var liJSON = thisEl.attr('data-polishing');
  
  var obj = JSON.parse( liJSON );

  thisEl.parents('.connector-type__block').find('.wrap-drop.polishing-dropdown').removeClass('disabled').find('.drop').html('')

  $.each(obj.fields, function(key, item){
    var isElement = (key == 0)? 'class="selected"':'';
    var appendLi = '<li '+isElement+' data-price="'+item.price+'"><a>'+item.title+'</a></li>'
    thisEl.parents('.connector-type__block').find('.wrap-drop.polishing-dropdown .drop').append(appendLi);
  });
  thisEl.parents('.connector-type__block').find('.wrap-drop.polishing-dropdown .selected-el span').html(obj.fields[0].title);
});
 

 var coefficient = 0;
  $(document).on('click','.fiber-card__js',function(){
    $('.fiber_js,.js-selected-fiber').html($(this).find('.js-card-text').text());
    coefficient = $(this).attr('data-coefficient');
    coefficientCalc();

    $('.visual-config__block .full-price').addClass('active');
  });
function coefficientCalc(){
  var rangeSliderVal =  $('.config-content.connector .input-amount__js').val();
  if (rangeSliderVal < 2) {
    $('.slider-block .container ').addClass('disabled').find('input').prop('checked', false);
    braidPrice = 0;
  }else{
    $('.slider-block .container ').removeClass('disabled')
  }
  var calculation = rangeSliderVal*coefficient+((rangeSliderVal-1)*braidPrice);
  $('.config-content.connector').attr('data-slider-price',calculation.toFixed(2));

  var pricesArray = 0;
  $('.config-content.connector .wrap-drop .selected').each(function(key,item){
    var prices = parseFloat($(item).attr('data-price'));
    pricesArray += prices;
  });
  $('.config-content.connector').attr('data-price',pricesArray.toFixed(2));

  var sliderPrice = parseFloat($('.config-content.connector').attr('data-slider-price')),
      fullPrice = parseFloat($('.config-content.connector').attr('data-price'));

  $('.full-price .text .num').html(numberWithCommas ((sliderPrice+fullPrice).toFixed(2)));
  $('.total-item .num_js').html(numberWithCommas ((sliderPrice+fullPrice).toFixed(2)));


}



  $('.show-btn .content-holder').click(function(){
    var checkedLength = $(document).find('.config-tabs[data-target='+navTarget+'] .config-tabs__item[data-active="1"]').length;

    if (checkedLength != 1) {
      $(this).parents('.visual-config').toggleClass('active');
    }
    });

  $('.single-slider').each(function(key,item){
    var minValue = parseFloat($(item).attr('data-min')),
        maxValue = parseFloat($(item).attr('data-max')),
        steps = parseFloat($(item).attr('data-steps')),
        toFixed = parseFloat($(item).attr('data-tofixed'));

    $(item).find('.input-amount').on('change',function(){
      var thisVal = parseFloat($(item).find('.input-amount').val()).toFixed(toFixed);
      $(this).val(thisVal);
      $(item).find(".slider-range-min").slider({
        value: [thisVal]
      });

      if (thisVal > maxValue) {
        $(this).val(maxValue);
        thisVal = maxValue;
        $(item).find(".slider-range-min").slider({
          value: [maxValue]
        });
      }

      if (thisVal < minValue || isNaN(thisVal) == true) {
        $(this).val(minValue);
        thisVal = minValue;
        $(item).find(".slider-range-min").slider({
          value: [minValue]
        });
      }

      $('.config-tabs.active .patchcord-length_js,.js-selected-length').html(thisVal + " м");
      descriptionText(this);
      coefficientCalc();
    });
    $(item).find( ".slider-range-min" ).slider({
      step: steps,
      range: "min",
      value: minValue,
      min: minValue,
      max: maxValue,
      slide: function( event, ui ) {
        $(item).find( ".input-amount" ).val(ui.value );
        var thisVal = parseFloat($(item).find('.input-amount').val());
        $('.config-tabs.active .patchcord-length_js,.js-selected-length').html(thisVal + " м")
        
        descriptionText(this);
        coefficientCalc();
      }
    });
    $(item).find( ".input-amount" ).val(minValue);
  });

$('.input-amount').on('keyup',function(e){
  $(this).val($(this).val().replace( /[^.0-9]/g,'')); 
});
  $('.reload-config').click(function(){
     location.reload();
  });

  var braidPrice = 0;
  $('.slider-block .container input').click(function(){
    var thisAttr = $(this).parents('.checkbox-holder').attr('data-braid-price'),
        rangeVal = +$('.input-amount__js').val();
    if (rangeVal < 2) {
      $(this).prop('checked', false);
      $(this).parents('.container').addClass('disabled');
    }else{
      $(this).parents('.container').removeClass('disabled');
      if (this.checked == true) {
        $('.braid_js').html('Применить');
        $('.js-selected-braid').html('<i class="icon-check"></i>'+'В гофре');
        braidPrice = thisAttr;
        $('.visual-config__dropwodnw .config-scheme .img-center').addClass('braid');
      }else{
        $('.braid_js').html('Не применять');
        $('.js-selected-braid').html('');
        braidPrice = 0;
        $('.visual-config__dropwodnw .config-scheme .img-center').removeClass('braid');
      }
      descriptionText(this);
      coefficientCalc();
    }
    
  });


function descriptionText(item){
  var infoHolder = "",
      parentsTarget = $(item).parents('.config-content').attr('data-target'),
      checkedElholder = "";

  $('.connector-type__block').each(function(key,item_block){
    var connectorSelected = $(item_block).find('.connector-dropdown .selected').text(),
        polishingSelected = $(item_block).find('.polishing-dropdown .selected').text(),
        connectorSelectedLength = $(item_block).find('.connector-dropdown .selected').length,
        polishingSelectedLength = $(item_block).find('.polishing-dropdown .selected').length;
        keyNum = key+1,
        slesh = (key == 0)? '': '<wbr> / ';
   
    infoHolder += (connectorSelectedLength >= 1 || polishingSelectedLength >= 1)? connectorSelected+' ('+polishingSelected+')'+',': ' ';

    if(checkedElholder != ""){
      checkedElholder += slesh;
    }

    checkedElholder += (connectorSelectedLength >= 1 || polishingSelectedLength >= 1)? "№"+keyNum+' '+connectorSelected+' ('+polishingSelected+')': '';

    if (connectorSelectedLength >= 1 || polishingSelectedLength >= 1) {
      $('.conector-type_js').html(checkedElholder);
    }
  });

  var inputVal = $('.slider-block .input-amount__js').val();

  infoHolder += ' '+inputVal+' m';
  if ($('.slider-block .container input').prop("checked") == true) {
    infoHolder += ", гофра";
  }else{
    infoHolder += "";
  }
  
  $('.config-tabs__item#'+parentsTarget+'').find('.description').html(infoHolder);
};

$('.connector-type__block .wrap-drop').on('click','.drop>li',function(){
  coefficientCalc();
  descriptionText(this);
  var polishingDropdownText = $(this).parents('.connector-type__block').find('.wrap-drop.polishing-dropdown .selected').text(),
      conectorSelectedText = $(this).parents('.connector-type__block').find('.wrap-drop.connector-dropdown .selected').text() ,
      summaryText = conectorSelectedText + '('+polishingDropdownText+')';
  if ($(this).parents().hasClass('connector-type__first')) {
    $('.js-connector-first').html(summaryText);
  }else{
    $('.js-connector-second').html(summaryText);
  }
});


 $(document).on('click','.visual-config__block .next-js:not(.prev)',function(){
  var dataActive = $('.config-tabs[data-target='+navTarget+'] .config-tabs__item.active').next('.config-tabs__item').attr('data-active');
  if (dataActive == 1) {
    $('.config-tabs[data-target='+navTarget+'] .config-tabs__item.active').next('.config-tabs__item[data-active="1"]').click();
  }else{
    return false;
  }
 });

  $('.config-sort__block.fiber-block .container input').on("click", function(){
      var thisEl = $(this),
          numLenght,
          obj = JSON.parse( thisEl.parents('.container').attr('data-range') ),
          checkedStatus = $(this).prop('checked');
          $('.config-tabs.active .steps-slider__list').html('');
          var maxValue;
              $.each(obj.fields, function(key, item){
                (key == 0)? numLenght = item.num.length : '';
                maxValue = $('.config-tabs.active .module-slider .steps-slider').attr('data-maxVal',+key+1);
                var itemNum = item.num;
                    if ( numLenght >= 4) {
                         itemNum=item.num/1000;
                    }
                var appendEl = '<li data-num="'+item.num+'" class="steps-slider__item">'+itemNum+'</li> ';
                    $('.config-tabs.active .steps-slider__list').append(appendEl);
          });

          var unitsChange = $('.config-title .units-js');
          (numLenght >= 4)? unitsChange.html('км') : unitsChange.html('м');
          (checkedStatus == true)? $('.js-sort-disabled .container').removeClass('disabled') : $('.js-sort-disabled .container').addClass('disabled');
  });
  (function(){
      var checkedLength = $('.config-sort__block.fiber-block .container input:checked').length;
          if( checkedLength == 0 ) {
              $('.js-sort-disabled .container').addClass('disabled');
          }
          $('.js-sort-disabled .container input').click(function(){
            if( $(this).parents('.container').hasClass('disabled') ){
                $(this).prop('checked',false);
            }
          });
    }());

$('.steps-slider').each(function(key,item){
  var arrayList = [],
      maxValue = parseInt($(document).find(item).attr('data-maxVal')),
      select = $(item).find(".steps-slider__js");
  var slider = $( "<div class='steps-slider__block'></div>" ).insertAfter( select ).slider({
      min: 1,
      max: maxValue,
      range: "min",
      value: select[ 0 ].selectedIndex + 1,
      slide: function( event, ui ) {
        select[ 0 ].selectedIndex = ui.value - 1;
      },
      change: function( event, ui ) {
        $(item).find('.steps-slider__item').each(function(key,item){
          var itemIndex = $(this).index(),
              thisAttr = $(item).attr('data-num');
          if ((itemIndex + 1) == ui.value) {
            arrayList[ui.handleIndex] = thisAttr;
            documentArray.slisteps = [arrayList];
          }
        });
      }
    });
    $(item).on('click','.steps-slider__range input', function(){
      var checkedStatus = $(this).prop('checked'),
          blockStatus = ($('.config-tabs.active .config-sort__block.fiber-block .container input').length >=1)? $('.config-sort__block.fiber-block .container input:checked').parents('.container').attr('data-block') : 0,
          checkedLength = $('.config-sort__block.fiber-block .container input:checked').length,
          parentsLenght = $('.config-tabs.active .config-sort__block.fiber-block .container').length;
          if( checkedStatus == true && blockStatus != 1 ) {
              $(item).find(slider).slider({
                range: true,
                values: [ 1 , maxValue],
              });
          }else if( checkedStatus == false && blockStatus != 1){
                    documentArray.slisteps[0].splice(0,2);
                    $(item).find(slider).slider({
                      range: "min",
                      value: select[ 0 ].selectedIndex + 1,
                    });
          }
          if( checkedLength == 0 && parentsLenght !=0 || $(this).parents('.container').hasClass('disabled')) {
              $(this).prop('checked', false);
              $(item).find(slider).slider({
                range: "min",
                value: select[ 0 ].selectedIndex + 1,
              });
          }
          (blockStatus == 1 && parentsLenght != 0)? $(this).prop('checked', false) :'';
    });
    $('.config-sort__block.fiber-block .container input').on("click", function(){
      var thisAttr = +$(this).parents('.container').attr('data-block');
          
          maxValue = parseInt($(document).find(item).attr('data-maxVal'));
          if( thisAttr == 1 ) {
              $('.config-tabs.active .steps-slider__range .container input').parents('.container').addClass('disabled').end().prop("checked",false);
              $('.config-tabs.active').find(slider).slider({
                range: "min",
                max: maxValue,
                value: maxValue,
              });
              $('.config-tabs.active').find(slider).slider( "disable" );
          }else{
              $('.config-tabs.active .steps-slider__range .container').removeClass('disabled');
              $('.config-tabs.active').find(slider).slider( "enable" );
              $('.config-tabs.active').find(slider).slider({
                max: maxValue,
                value: select[ 0 ].selectedIndex + 1,
              });
          }
    });

    function clearRangeFunc (){
      $('.config-tabs.active').find(slider).slider({
          range: "min",
          value: select[ 0 ].selectedIndex + 1,
        });
      $('.config-tabs.active .steps-slider__range .container input').prop("checked",false);
    }

    $(document).on('click','.config-tabs.active .config-sort__clear',function(){
      if( $(this).hasClass('panels-filter-clear') ) {
          clearRangeFunc();
          $('.config-tabs.active .js-card-button , .config-tabs.active .js-card-checkbox').removeClass('active');
      }else{
          $('.config-tabs.active .js-sort-disabled .container,.config-tabs.active .steps-slider__range .container').addClass('disabled');
          //$('.config-tabs.active .steps-slider__range .container').removeClass('disabled');
          clearRangeFunc();
          $('.config-tabs.active').find(slider).slider( "disable" );
          $('.config-tabs.active .config-sort .container input').prop('checked' , false);
          $('.config-tabs.active').find($(item).find('.steps-slider__list')).html('<li data-num="0" class="steps-slider__item">0</li>');
      }
      if( $(this).hasClass('industrial-button__clear') ) {
          $('.industrial-equipment__button ,.port-filter').removeClass('active');
          $('.config-tabs.active .steps-slider__range .container').addClass('disabled');
          $('.config-tabs.active').find(slider).slider( "disable" );
          $('.config-tabs.active .slider-switcher input').prop('checked',false);
      }
    });
    (function(){
      $('.module-slider--disabled .steps-slider__range .container').addClass('disabled');
      $('.module-slider--disabled').find(slider).slider( "disable" );
    }());
    $(document).on('click','.slider-switcher input', function(){
      var checkedStatus = $(this).prop('checked');
          if( checkedStatus == true ) {
              $(this).parents('.steps-slider').find(slider).slider( "enable" );
              $(this).parents('.steps-slider').find('.steps-slider__range .container').removeClass('disabled');
          }else{
              clearRangeFunc();
              $(this).parents('.steps-slider').find(slider).slider( "disable" );
              $(this).parents('.steps-slider').find('.steps-slider__range .container').addClass('disabled');
          }
    });
  });

// tooltip
$('.tooltip-button__js').each(function(key,item){
  $(item).on('click',function(){
    var parentStatus = $(this).parents().attr('data-tooltip');
    if( parentStatus != 0 ){
        var thisEl = $(this).parents("[data-tooltip=1]").find($(this)),
          thisParentsText = $(this).parents("[data-tooltip=1]").attr('data-tooltip__text'),
          parentsOffset = thisEl.offset(),
          parentsHeight = thisEl.height()+8;
          $('.tooltip').addClass('active').find('.text').html(thisParentsText);
          var parentsWidth = thisEl.outerWidth()/2 - $('.tooltip').outerWidth()/2;

        $(window).resize(function(){
          if( $('.tooltip').hasClass("active") ) {
              parentsOffset = thisEl.offset(),
              parentsHeight = thisEl.height()+8,
              parentsWidth = thisEl.outerWidth()/2 - $('.tooltip').outerWidth()/2;
              $('.tooltip').css({
                "top": (parentsOffset.top +parentsHeight)+"px" ,
                'left':(parentsOffset.left +parentsWidth)+"px",
              });
          }
        });

        $('.tooltip').css({
          "top": (parentsOffset.top +parentsHeight)+"px" ,
          'left': (parentsOffset.left +parentsWidth)+"px",
        });
        setTimeout(function() {
          $('.tooltip').removeClass('active');
        }, 5000);
    }
  });
});

$('.js-card-checkbox').click(function(event){
  var thisEl = $(this);
  if( !$(event.target).parents().hasClass('filter-card__info')) {
      thisEl.toggleClass('active');
  }
});

$(document).on('click', function(event){
  var if_neededelement = $(event.target).parent('.filter-card__info').length;
  var if_thisbutton = $(event.target).hasClass('filter-card')? true: $(event.target).parents('.filter-card').length > 0? true: false;
      if(!if_thisbutton && !if_neededelement){
         $('.filter-card').find('.filter-card__info').css({
            'opacity':'0',
          });
      }else{
         $(event.target).parents('.filter-card').find('.filter-card__info').css({
            'opacity':'1',
          });
      }
});


function industrialCardText (itemThis){
  var buttonLength = $('.config-content.active .js-industrial-button').length,
      activeButtonLength = $('.config-content.active .js-industrial-button.active').length;
      
      (buttonLength === activeButtonLength)? $('.industrial-equipment__button').addClass('active') : $('.industrial-equipment__button').removeClass('active');

}

$(document).on('click','.industrial-equipment__button', function(){
  if( $(this).hasClass('active') ) {
      $('.js-industrial-button').removeClass('active');
  }else{
      $('.js-industrial-button').addClass('active');
  }
  industrialCardText (this);
})
$('.js-industrial-button').click(function(){
  industrialCardText (this);
});

$(document).on('click','.js-industrial-content .industrial-equipment__button,.js-industrial-content .js-card-button',function(){
  var checkedLength = $('.js-industrial-content .js-card-button.active').length;
      (checkedLength !==0)? $('.port-filter').addClass('active') : $('.port-filter').removeClass('active');
});


// show slide when table is overflow
if( $(window).width() < 1170) {
    var tabsButtonWidth = $('.config-table').width();
    var tabsButtonRealWidth = $('.config-table')[0].scrollWidth;
        if( tabsButtonRealWidth > tabsButtonWidth){
            $('.overflow-arrow').addClass('active');
        };
        $('.config-table').on('scroll' , function(){
          $('.overflow-arrow').removeClass('active');
        });
}



}); //document ready