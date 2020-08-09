$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat-main__message-list__message-box" data-message-id=${message.id}>
          <div class="chat-main__message-list__message-box__info">
            <div class="userName">
              ${message.user_name}
            </div>
            <div class="daydata">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__message-box__message">
            <p class="comment">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat-main__message-list__message-box" data-message-id=${message.id}>
        <div class="chat-main__message-list__message-box__info">
          <div class="userName">
            ${message.user_name}
          </div>
          <div class="daydata">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__message-box__message">
          <p class="comment">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit').prop("disabled", false);
    });
  });
});