// params consist of params.id and params.note which is nested object with properties
// note.title, note.text, note.userId
function mapCreatedNoteToDto(params) {
    const dto = {
        id: params.id,
        title: params.note.title,
        text: params.note.text,
        userId: params.note.userId,
    };
    return dto;
}

// params consist of note.id, note.title, note.text and task.userId
function mapNoteToDto(note) {
    const dto = {
        id: note.id,
        title: note.title,
        text: note.text,
        userId: note.userId,
    };
    return dto;
}

module.exports = {
    mapCreatedNoteToDto,
    mapNoteToDto,
}
