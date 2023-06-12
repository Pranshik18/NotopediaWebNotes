import moment from "moment";

  //Handling the filtering logic
export function filterNote(notes, searchText) {
    notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
);
}

export function sortNote(notes, sortBy) {
    return notes.sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "dateCreated") {
          return moment(a.dateCreated, "DD-MM-YYYY HH:mm:ss").diff(
            moment(b.dateCreated, "DD-MM-YYYY HH:mm:ss")
          );
        } else if (sortBy === "dateModified") {
          return moment(a.timeCreated, "HH:mm:ss").diff(
            moment(b.timeCreated, "HH:mm:ss")
          );
        }
      });
}