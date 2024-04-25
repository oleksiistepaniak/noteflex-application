const Note = function (newNote) {
    this.title = newNote.title;
    this.text = newNote.text;
    this.userId = newNote.userId;
}

module.exports = Note;