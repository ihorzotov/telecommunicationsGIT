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
        if (thisVal > inputRightCurrent || thisVal > inputRightVal){
           inputLeft.val(inputRightVal);
           $(item).find(".slider-range").slider({
            values: [inputRightVal ,inputRightVal]
          });
        };
        if (thisVal > sliderMaxValue || thisVal > sliderMaxValue ) {
          $(this).val(sliderMaxValue);
        } else if(thisVal < sliderMinValue){
          $(this).val(sliderMinValue);
        }
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
      $('.input-value').on('change',function(){
        var appendParent = $('.aside .checked-filters__list');
        var inputLeftVal = parseFloat($(item).find('.input-left').val());
        var inputRightVal = parseFloat($(item).find('.input-right').val());
        var parentsID = $('.range-slider').attr('id');
        var rangeFilter = $(item).parents('.filer-block').find('.filer-block__title').text();
        var appendList = '<li class="checked-filters__item" data-target='+parentsID+'>\
                      <span class="remove-filter"><i class="fas fa-times"></i></span>\
                      <span class="text">'+rangeFilter+' : ' +inputLeftVal+' - ' +inputRightVal+ '</span></li>';

          appendParent.append(appendList);
      });
  });
});
})
$('.input-value').on('keyup',function(e){
  $(this).val($(this).val().replace( /[^\d]/g ,'')); 
});