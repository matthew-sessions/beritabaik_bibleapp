async function get_books_a() {
    let response = await (await fetch(`${document.baseURI}api/books`)).json();
    return response;
}
async function get_chapters(name) {
    let response = await (await fetch(`${document.baseURI}api/chapters/` + name)).json();
    var chapters = response['chapters'];
    var maindiv = document.getElementById('maincontent');
    maindiv.innerHTML = ""
    var contentdiv = document.createElement("div");
    contentdiv.setAttribute("id", "contentlogic")
    maindiv.appendChild(contentdiv)
    for (let i = 0; i < chapters.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "numberli");
        div.innerText = chapters[i];
        contentdiv.appendChild(div);
    };
    var alldivs = document.getElementsByClassName("numberli");
    for (let i = 0; i < alldivs.length; i++) {
        console.dir(alldivs[i])
        alldivs[i].addEventListener("click", function () { get_verses(name, alldivs[i].innerText); }, false);
    }
}

function logit(event) {

    console.log(event);
};

function set_title(text) {
    var title = document.getElementById("toptext");
    title.innerText = text;
    get_chapters(text)
}


let new_res = get_books_a()
new_res.then(res => {
    let names = res.books;
    let base_url = document.baseURI
    var ul = document.getElementById('thenav');
    for (let i = 0; i < names.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute('class', 'bookclick')
        a.setAttribute('id', names[i])
        a.appendChild(document.createTextNode(names[i]));
        li.appendChild(a);
        ul.appendChild(li);
    }
    var allas = document.getElementsByClassName("bookclick");
    for (let i = 0; i < allas.length; i++) {
        allas[i].addEventListener("click", function () { set_title(allas[i].text); }, false);
    }
})


async function get_verses(name, verse) {
    var title = document.getElementById("toptext");
    title.innerText = name + " - Chapter: " + verse;
    let response = await (await fetch(`${document.baseURI}api/read/` + name + "/" + verse)).json();
    var english = response['english'];
    var malay = response['malay'];
    var maindiv = document.getElementById('maincontent');
    maindiv.innerHTML = "";
    var lasteng;
    var keys = Object.keys(english);
    for (let ii = 0; ii < keys.length; ii++) {
        var i = keys[ii];
        if (!malay[i]) {
            console.log(i)
            var innernumber = malaydiv.childNodes[0].childNodes[0].childNodes[1];

            innernumber.innerText = " - " + i
            var penglishtemp = document.createElement("p");
            penglishtemp.innerHTML = `<span class="spanspace"><b>${i}</b></span>    ${english[i]}`;
            lasteng.appendChild(penglishtemp);
        } else {
            var versediv = document.createElement("div");
            versediv.setAttribute("id", "versesdiv");
            var englishdiv = document.createElement("div");
            englishdiv.setAttribute("class", "numberverse");
            var penglish = document.createElement("p");


            penglish.innerHTML = `<span class="spanspace"><b>${i}</b></span>    ${english[i]}`;
            englishdiv.appendChild(penglish);
            versediv.appendChild(englishdiv);

            var malaydiv = document.createElement("div");
            malaydiv.setAttribute("class", "numberverse");
            var pmalay = document.createElement("p");
            pmalay.innerHTML = `<span class="spanspace"><b>${i}</b><b id="innernumber"></b></span>    ${malay[i]}`;

            malaydiv.appendChild(pmalay);
            versediv.appendChild(malaydiv);
            maindiv.appendChild(versediv);
            lasteng = penglish;
        }

    }

    // for (let i = 0; i < chapters.length; i++) {
    //     var div = document.createElement("div");
    //     div.setAttribute("class", "numberverse");
    //     div.innerText = chapters[i];
    //     contentdiv.appendChild(div);
    // };
    // var alldivs = document.getElementsByClassName("numberli");
    // for (let i = 0; i < alldivs.length; i++) {
    //     console.dir(alldivs[i])
    //     alldivs[i].addEventListener("click", function () { logit(alldivs[i].innerText); }, false);
    // }
}