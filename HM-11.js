// • Вам необхідно написати додаток Todo list, використовуючи синтаксис класів. 
// У списку нотаток повинні бути методи для додавання нової нотатки, видалення, редагування та отримання повної інформації про нотатку, а так само отримання списку всіх нотаток. 
// Крім цього, у користувача має бути можливість позначити замітку, як виконану, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконань. 
// Нотатки не повинні бути порожніми.
// • Вам необхідно розширити можливості вашого списку і додати методи для пошуку замітки на ім'я, а також методи для сортування нотаток за статусом (спочатку виконані і навпаки).
// • Вам необхідно додати кожній нотатці дату її створення і редагування, а також розширити можливості пошуку і сортування, включивши в них можливість роботи з датою

class TodoList {
    constructor() {
        this.notes = [];
        this.nextId = 1;
    }

    _getCurrentTimestamp() {
        return new Date().toISOString();
    }

    _findNoteById(noteId) {
        return this.notes.find(note => note.id === noteId);
    }

    addNote(text) {
        if (!text) {
            throw new Error("Note text cannot be empty.");
        }
        const now = this._getCurrentTimestamp();
        const note = {
            id: this.nextId++,
            text,
            completed: false,
            createdAt: now,
            lastEditedAt: now
        };
        this.notes.push(note);
    }

    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }

    editNote(noteId, newText) {
        if (!newText) {
            throw new Error("Note text cannot be empty.");
        }
        const note = this._findNoteById(noteId);
        if (note) {
            note.text = newText;
            note.lastEditedAt = this._getCurrentTimestamp();
        }
    }

    toggleComplete(noteId) {
        const note = this._findNoteById(noteId);
        if (note) {
            note.completed = !note.completed;
            note.lastEditedAt = this._getCurrentTimestamp();
        }
    }

    getNoteInfo(noteId) {
        return this._findNoteById(noteId) || null;
    }

    getAllNotes() {
        return this.notes;
    }

    searchNotesByName(searchText) {
        return this.notes.filter(note => note.text.toLowerCase().includes(searchText.toLowerCase()));
    }

    sortNotesByStatus(completedFirst = true) {
        return this.notes.sort((a, b) => completedFirst ? b.completed - a.completed : a.completed - b.completed);
    }

    sortNotesByDate(oldestFirst = true) {
        return this.notes.sort((a, b) => oldestFirst ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt));
    }

    getStats() {
        const total = this.notes.length;
        const completed = this.notes.filter(note => note.completed).length;
        const unfulfilled = total - completed;
        return { total, completed, unfulfilled };
    }

    getDetailedStats() {
        return {
            total: this.notes.length,
            completed: this.notes.filter(note => note.completed),
            unfulfilled: this.notes.filter(note => !note.completed),
            allNotes: this.getAllNotes()
        };
    }
}

// Example usage
const myTodoList = new TodoList();

// Adding notes
myTodoList.addNote("Buy groceries");
myTodoList.addNote("Read a book");
myTodoList.addNote("Walk the dog");

// Searching notes by name
console.log("Search Results:", myTodoList.searchNotesByName("book"));

// Sorting notes by status
console.log("Sorted by Status:", myTodoList.sortNotesByStatus());

// Sorting notes by creation date
console.log("Sorted by Date:", myTodoList.sortNotesByDate());

// Editing a note
myTodoList.editNote(2, "Finish reading a novel");

// Deleting a note
myTodoList.deleteNote(3);

// Toggling completion status of a note
myTodoList.toggleComplete(1);

// Getting information about a specific note
console.log("Note Info:", myTodoList.getNoteInfo(1));

// Getting all notes
console.log("All Notes:", myTodoList.getAllNotes());

// Getting basic statistics
console.log("Basic Stats:", myTodoList.getStats());

// Getting detailed statistics
console.log("Detailed Stats:", myTodoList.getDetailedStats());
