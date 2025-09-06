import React, { useState, useEffect } from 'react';
import useProfileStore from '../store/useProfileStore';
import ProfileCard from '../components/ProfileCard';
import { FaSearch, FaTimes } from 'react-icons/fa';

const HomePage = () => {
  // Connect to the Zustand store
  const { profiles, loading, error, getAllProfiles, getProfilesBySkill } = useProfileStore();

  // Local state for the search input field
  const [searchQuery, setSearchQuery] = useState('');
  // State to track if a search is currently active to show the "Clear" button
  const [activeSearch, setActiveSearch] = useState('');

  // Fetch all profiles when the component first loads
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  // Handler for the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      getProfilesBySkill(searchQuery);
      setActiveSearch(searchQuery);
    }
  };

  // Handler to clear the search and fetch all profiles again
  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
    getAllProfiles();
  };

  // Renders the main content based on the state from the store
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-500 mt-8">Loading profiles...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500 mt-8">{error}</p>;
    }

    if (profiles.length === 0) {
      return (
        <div className="text-center text-gray-500 mt-8">
          <h3 className="text-xl font-semibold">No Profiles Found</h3>
          <p>Try adjusting your search criteria or clear the search to see all profiles.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">Find Your Next Star</h1>
          <p className="text-lg text-gray-600">Search through our talented pool of candidates by skill.</p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skills (e.g., react, node, css)"
              className="w-full pl-12 pr-32 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center bg-blue-600 text-white font-semibold px-6 m-1.5 rounded-full hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
          {activeSearch && (
            <div className="flex justify-center items-center mt-4">
              <span className="text-sm text-gray-600">Showing results for: "{activeSearch}"</span>
              <button onClick={handleClearSearch} className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                <FaTimes /> Clear
              </button>
            </div>
          )}
        </div>

        {/* Profiles Grid */}
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

