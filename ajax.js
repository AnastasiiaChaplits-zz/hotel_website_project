function showContent(link, scriptLink) {

    let cont = document.getElementById('contentBody');

    let http = new XMLHttpRequest();
    http.open('get', link); //настройка запроса

    http.onreadystatechange = function () { //обработчик событий который вызывается при изменении состояния запроса
        if(http.readyState === 4) { //состояние документа 4 - завершён
            cont.innerHTML = http.responseText;
            window.scrollTo(0,0);

            if (scriptLink) {
                let newScript = document.createElement("script");
                newScript.src = scriptLink;
                document.querySelector('body').appendChild(newScript);
            }
        }
    };
    http.send(); //отправка запроса
}