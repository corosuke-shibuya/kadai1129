// app.js
console.log("★app.js 読み込まれたよ");

//入力欄を空にする
// $("#keyword").val("");
// $("#text").val("");

$("#clear").on("click", function () {
  localStorage.clear();
$("#keyword").val("");
    });


$(function () {
  console.log("★DOM 準備OK");

  $("#searchBtn").on("click", function () {
    console.log("★検索ボタン クリックされた");

    // ① キーワード取得
    var keyword = $("#keyword").val().trim();
    console.log("★keyword:", keyword);

    // ② 何も入ってなかったらAPIを叩かない
    if (!keyword) {
      $("#content").html("キーワードを入力してください。");
      return;
    }

    // ③ URLを組み立て
    var url = "https://www.googleapis.com/books/v1/volumes?q="
              + encodeURIComponent(keyword);
    console.log("★URL:", url);

    // ④ API呼び出し
    $.getJSON(url, function (data) {
      console.log("★getJSON 成功", data);

      var view = "";
      // 3件だけ表示
      for (var i = 0; i < 3; i++) {
        var item = data.items[i];
        view += "<ul>";
        view += "<li>タイトル:" + item.volumeInfo.title + "</li>";
        view += "</ul>";
      }

  // 保存する
  localStorage.setItem("books_keyword", keyword);
  localStorage.setItem("books_view", view);

  // 追加：保存できたか確認
  console.log("★保存された books_keyword:",
              localStorage.getItem("books_keyword"));
  console.log("★保存された books_view:",
              localStorage.getItem("books_view"));

  $("#content").html(view);

  $("#keyword").val("");

});
  });
});

// $(function () {   
//     console.log("★クリックされたよ");
// console.log("★keyword:", keyword);
// $("#searchBtn").on("click", function () {

//  // ① キーワード取得
//   var keyword = $("#keyword").val().trim();

//   // ② 何も入ってなかったらAPIを叩かない
//   if (!keyword) {
//     $("#content").html("キーワードを入力してください。");
//     return;
//   }

//   // ③ URLを組み立て
//   var url = "https://www.googleapis.com/books/v1/volumes?q="
//             + encodeURIComponent(keyword);

//   console.log("★URL:", url); // デバッグ用に確認

//   // ④ API呼び出し
//   $.getJSON(url, function (data) {
//     console.log("★getJSON 成功", data);

//     var view = "";
//     for (var i = 0; i < data.items.length; i++) {
//       var item = data.items[i];
//       view += "<ul>";
//       view += "<li>題名:" + item.volumeInfo.title + "</li>";
//       view += "</ul>";
//     }

//     console.log("★getJSON 成功", data);
//     $("#content").html(view);
//   });
// });
// });