function showContent(link, scriptLink) {

    var cont = document.getElementById('contentBody');

    var http = new XMLHttpRequest();
    http.open('get', link); //настройка запроса

    http.onreadystatechange = function () { //обработчик событий который вызывается при изменении состояния запроса
        if(http.readyState === 4) { //состояние документа 4 - завершён
            cont.innerHTML = http.responseText; //результирующий докумен в виде текста
            window.scrollTo(0,0);

            if (scriptLink) {
                var newScript = document.createElement("script");
                newScript.src = scriptLink;
                document.querySelector('body').appendChild(newScript);
            }
        }
    };
    http.send(); //отправка запроса
}