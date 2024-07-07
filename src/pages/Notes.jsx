import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Grid, List, Pencil, Trash } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const handleAddNote = () => {
    if (newNote.title || newNote.content) {
      if (editingNoteId !== null) {
        setNotes(notes.map(note => 
          note.id === editingNoteId ? { ...note, ...newNote } : note
        ));
        setEditingNoteId(null);
      } else {
        setNotes([...notes, { id: Date.now(), ...newNote }]);
      }
      setNewNote({ title: "", content: "" });
      setIsDialogOpen(false);
    }
  };

  const handleEditNote = (note) => {
    setNewNote({ title: note.title, content: note.content });
    setEditingNoteId(note.id);
    setIsDialogOpen(true);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsGridView(true)}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setIsGridView(false)}>
            <List className="h-4 w-4" />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setNewNote({ title: "", content: "" }); setEditingNoteId(null); }}>
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingNoteId !== null ? "Edit Note" : "Add New Note"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <Textarea
                  placeholder="Content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
              </div>
              <Button onClick={handleAddNote}>{editingNoteId !== null ? "Save Changes" : "Add Note"}</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className={`grid gap-4 ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEditNote(note)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleDeleteNote(note.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;