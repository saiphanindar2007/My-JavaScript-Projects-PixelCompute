let noteInput = document.getElementById('noteInput');
let plusButton = document.getElementById('add');
let notes = document.getElementById('notes');
let noteNo = 0;
plusButton.addEventListener('click', function(){
    let note = document.createElement('div');
    if(noteInput.value == ""){
        return;
    }
    let text = document.createElement('p');
    text.textContent = noteInput.value;
    let button = document.createElement('button');
    button.textContent = "X";
    noteNo++;
    if(noteNo % 2 == 0){
        note.style.cssText = "background-color: lightyellow; padding: 10px; margin: 10px; width: 180px; display: inline-block;";
    }
    if(noteNo % 2 != 0){
        note.style.cssText = "background-color: lightpink; padding: 10px; margin: 10px; width: 180px; display: inline-block;";
    }
    button.addEventListener('click', function(){
        note.remove();
    });
    note.appendChild(text);
    note.appendChild(button);
    notes.appendChild(note);
    noteInput.value = "";
});