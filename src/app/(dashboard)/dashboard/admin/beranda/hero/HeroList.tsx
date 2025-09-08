"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { GripVertical, Trash2 } from "lucide-react";

interface HeroImage {
  _id?: string;
  url: string;
  name?: string;
  createdAt?: string;
}

interface HeroListProps {
  images: HeroImage[];
  onAdd: () => void;
  onDelete: (img: HeroImage) => void;
  onReorder: (newOrder: HeroImage[]) => void;
}

export default function HeroList({ images, onAdd, onDelete, onReorder }: HeroListProps) {
  const [deleteMode, setDeleteMode] = useState(false);

  // Sinkronisasi state lokal jika prop images berubah
  const [items, setItems] = useState(images);
  useEffect(() => {
    setItems(images);
  }, [images]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);

    setItems(newItems);
    onReorder(newItems);
  };

  const toggleDeleteMode = () => setDeleteMode(!deleteMode);

  return (
    <div className="bg-blue-600 p-6 rounded-lg text-white">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="hero-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {items.map((img, index) => (
                <Draggable key={img._id} draggableId={img._id!} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex justify-between items-center bg-gray-200 text-black rounded-lg px-4 py-3 shadow"
                    >
                      <div className="flex items-center gap-3">
                        <img src={img.url} alt={img.name} className="w-10 h-10 rounded-full" />
                        <span>{img.name || "Untitled"}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {img.createdAt ? new Date(img.createdAt).toLocaleDateString() : ""}
                        </span>

                        {deleteMode ? (
                          <button
                            onClick={() => onDelete(img)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={20} />
                          </button>
                        ) : (
                          <div {...provided.dragHandleProps} className="cursor-grab">
                            <GripVertical size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={toggleDeleteMode}
          className={`px-4 py-2 rounded ${
            deleteMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
          } flex items-center gap-2`}
        >
          <Trash2 size={16} />
          {deleteMode ? "Cancel" : "Hapus"}
        </button>
        <button
          onClick={onAdd}
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
