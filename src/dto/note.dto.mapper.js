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

module.exports = {
    mapCreatedNoteToDto,
}
