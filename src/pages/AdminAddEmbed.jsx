import React, { useState } from 'react';
import axios from 'axios';

const AdminAddEmbed = () => {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/facebook-embeds', {
      url,
      description
    });
    setUrl('');
    setDescription('');
    alert('Embed added!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Facebook post/video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Embed
      </button>
    </form>
  );
};

export default AdminAddEmbed;
