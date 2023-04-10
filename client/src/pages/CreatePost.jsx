import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import api from '../services/api';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // service function to share posts on homepage after generating an image (takes name, prompt and photo in a form), used inside handleSubmit
  const sharePhoto = (form) =>
    api.post('/post', { form }).then((response) => response.data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.prompt && form.photo) {
      setLoading(true);
      sharePhoto(form).then((data) => {
        setLoading(false);
        navigate('/');
      });
    } else {
      alert('Plz enter prompt and create image first!');
    }
  };

  // detecting change in the input field
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // taking a prompt option from constants array and updating the form
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // service function to create an image with dall-e
  const createPhoto = (prompt) =>
    api.post('/dalle', { prompt }).then((response) => response.data);

  // generating an image and updating the form with the result
  const generateImg = () => {
    if (form.prompt) {
      setGeneratingImg(true);
      createPhoto(form.prompt).then((data) => {
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        setGeneratingImg(false);
      });
    } else {
      alert('Please enter a prompt');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create an image with DALL-E AI, share it and download
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* name field */}
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Erkki Esimerkki"
            value={form.name}
            onChange={handleChange}
          />
          {/* prompt field */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Spongebob Squarepants in the Blair Witch Project"
            value={form.prompt}
            onChange={handleChange}
            isSurpriseMe
            onSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 test-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {/* ai image render */}
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          {/* generate img button */}
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Share the image with others if you wish so
          </p>
          {/* share img button */}
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469FF] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
