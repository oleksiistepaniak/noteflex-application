const Note = require('../models/note.model');
const noteRepository = require('../repositories/note.repo');
const noteDtoMapper = require('../dto/note.dto.mapper');
const {apiCheck} = require("../util/api.util");
const {apiMessages} = require("../util/api.messages");

// params consist of params.userId, params.title and params.text
async function createNote(params) {
    const note = new Note({
        title: params.title,
        text: params.text,
        userId: params.userId,
    });

    const result = await noteRepository.createNote(note);
    return noteDtoMapper.mapCreatedNoteToDto({
        id: result.insertId,
        note,
    });
}

// params consist of optional value params.title and required value params.userId
async function findAllNotes(params) {
    const notes = await noteRepository.findAllNotes(params);
    return notes.map(it => noteDtoMapper.mapNoteToDto(it));
}

// params consist of required values params.userId and params.id (which is note id)
async function findNoteById(params) {
    const notes = await noteRepository.findNoteById(params);
    apiCheck(!(notes.length === 0), apiMessages.NOTE.NOTE_NOT_FOUND);
    return noteDtoMapper.mapNoteToDto(notes[0]);
}

module.exports = {
    createNote,
    findAllNotes,
    findNoteById,
}
