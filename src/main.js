const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
    // GET NOTES FROM LOCAL STORAGE
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]")
}

function saveNotes(notes) {
    // SAVE NEW NOTES TO LOCAL STORAGE (BY TAKING NOTES AS INPUT)
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    // CREATE A NEW NOTES ELEMENT
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note"

    // ADD EVENT LISTENERS TO TRIGGER EVENTS
    element.addEventListener("change", () => {
        updateNote(id, element.value)
    })

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this sticky note?");
        // doDelete = true > is user press OK > else > false

        if (doDelete) {
            deleteNotes(id, element)
        }
    })

    return element;
}

function addNote() {
    // ADD NOTES TO HTML AND TO LOCAL STORAGE
    const existingNotes = getNotes();
    // ADD NEW ELEMENT TO THIS ARRAY AND UPDATE THE ARRAY
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    // APPEND TO ARRAY
    existingNotes.push(noteObject)
    saveNotes(existingNotes)
}

function updateNote(id, newContent) {
    // UPDATE NOTES
    // console.log("Updating Note...")
    // console.log(id, newContent)

    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNotes(id, element) {
    // DELETE NOTES
    // console.log("Deleting Note...")
    // console.log(id)

    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}