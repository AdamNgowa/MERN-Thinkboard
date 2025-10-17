import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You are creating notes to fast", {
          duration: 4000,
          icon: "☠️",
        });
      } else {
        console.log("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </Link>

          {/* Card container */}
          <div className="bg-[#1a1a1a] border-t-4 border-green-400 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Create New Note
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title input */}
              <div>
                <label className="block text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content textarea */}
              <div>
                <label className="block text-gray-400 mb-2">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-green-400 transition h-40 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold 
                             px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
