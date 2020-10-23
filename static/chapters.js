async function get_books_a(name) {
    let response = await (await fetch('http://127.0.0.1:5000/api/chapters/' + name)).json();
    logit(response)
    return response;
}

function logit(something) {
    console.log(something);
};

logit(document.title.replace('%20', ''))

get_books_a(document.title)