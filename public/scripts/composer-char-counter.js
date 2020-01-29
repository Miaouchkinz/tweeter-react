$(document).ready(() => {
  $('form > textarea').on('input', function() {
    $('#counter').text(140 - $(this).val().length);
    if ($('#counter').text() < 0) {
      $('#counter').addClass('invalid-char-count');
    } else if ($('#counter').text() >= 0) {
      $('#counter').removeClass('invalid-char-count');
    }
  });
});