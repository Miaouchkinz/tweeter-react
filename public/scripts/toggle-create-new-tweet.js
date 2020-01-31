$(document).ready(function(){

  $("#arrow-icon").click(function(){
    $(".create-tweet").slideToggle();
    $(".create-tweet textarea").focus();
  });

  $("#arrow-icon").hover(function() {
    $(this).css('cursor','pointer');
  }, function() {
    $(this).css('cursor','auto');
  });

});