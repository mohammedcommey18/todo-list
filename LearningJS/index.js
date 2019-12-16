var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function createElement() {
    var li = document.createElement('li');
    var text = input.value
    li.appendChild(document.createTextNode(text));
    ul.appendChild(li);
    input.value = '';


    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('X'));
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', deleteListItem)

    var editButton = document.createElement('button');
    var iele = document.createElement('i');
    iele.className = 'fas fa-pencil-alt';
    editButton.appendChild(iele)
    li.appendChild(editButton);
    editButton.addEventListener('click', editListItem)

   
    // var editBtn = document.createElement('i');
    // var icon = document.createTextNode('');
    // editBtn.appendChild(icon);
    // editBtn.className = 'fas fa-pencil-alt';
    // var btn = document.createElement('button');
    // btn.appendChild(editBtn)
    // console.log(btn)
    // editBtn.appendChild(document.createTextNode())


    function editListItem() {
        console.log(text);
        input.value = text;
        input.focus();
        
    }



    function deleteListItem() {
    li.classList.add('delete');

    }

}


/////


function addItem() {
    // console.log(input.value);
    if (inputLength > 0) {
        createElement()
    } 

}



enterButton.addEventListener('click', addItem);
input.addEventListener('keypress', function(event){
    if (inputLength() > 0 && (event.keyCode === 13 || event.which === 13) ) {
        createElement();
    }
});


