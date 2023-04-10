import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';
import api from '../services/api';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Card = ({ _id, name, prompt, photo, fetchPosts }) => {
  const deleteImg = (id) =>
    api.delete(`/post/${id}`).then((response) => response.data);

  const handleDeleteImg = () => {
    deleteImg(_id)
      .then(() => {
        console.log('Image was deleted');
        fetchPosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl imageai"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:opacity-100 opacity-0 flex-col transition duration-700 max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#10131f] p-4 rounded-md">
        <p className="text-white text-xs overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-[#ff9c60] flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              title="Download"
              onClick={() => downloadImage(_id, photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
            <button
              type="button"
              title="Delete"
              onClick={() => handleDeleteImg()}
              className="outline-none bg-transparent border-none text-white text-xs ml-3"
            >
              <DeleteOutlineIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
