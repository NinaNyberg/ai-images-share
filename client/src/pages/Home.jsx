import React, { useState, useEffect } from 'react';
import { Loader, FormField, RenderCards } from '../components';
import api from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null);

  // get posts to render on homepage
  const fetchPosts = () => {
    api.get('/post').then((response) => {
      response.data;
      setPosts(response.data.posts.reverse());
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, []);

  // search/filter posts on homepage (TODO: may be changed so that search comes from backend)
  const handleSearch = (e) => {
    setSearchText(e.target.value);

    const searchResults = posts.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchText.toLowerCase())
    );
    setResults(searchResults);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Community share point
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        {/* search field */}
        <FormField
          type="text"
          name="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      {/* render posts */}
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Results for <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={results} title="Nothing found :(" />
              ) : (
                <RenderCards
                  data={posts}
                  title="No posts found"
                  fetchPosts={fetchPosts}
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
