import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); //This prevents default navigation behaviour
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); //get rid of the deleted one
      toast.success("Note Deleted Successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete the note");
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="bg-[#1a1a1a] border-t-4 border-green-400 rounded-lg 
                 hover:shadow-lg transition-all duration-200"
    >
      <div className="card-body p-5">
        <h3 className="card-title text-lg font-semibold text-white">
          {note.title}
        </h3>

        <p className="text-gray-400 line-clamp-3">{note.title}</p>

        <div className="card-actions items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <button
              title="Edit"
              className="p-1 rounded-md hover:bg-green-500/10 transition-colors"
            >
              <PenSquareIcon className="w-4 h-4 text-green-400" />
            </button>

            <button
              title="Delete"
              className="p-1 rounded-md hover:bg-red-500/10 transition-colors"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
