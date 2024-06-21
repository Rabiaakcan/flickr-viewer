'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('/api/feed');
      setImages(response.data.items);
    };
    fetchImages();
  }, []);

  const handleSearch = async () => {
    const response = await axios.get(`/api/search?tags=${tags}`);
    setImages(response.data.items);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Flickr Public Feed</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border p-2 mr-2 w-1/2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Search by tags"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image: any) => (
          <div key={image.link} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={image.media.m} alt={image.title} className="w-full h-auto" />
            <div className="p-2">
              <h2 className="font-bold">{image.title}</h2>
              <p className="text-sm text-gray-500">{image.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
