import React from 'react';
import { useHistory } from 'react-router-dom';
import { Search, Image, MapPin, Filter } from 'lucide-react';
import GenrePicker from './get-started/GenrePicker';

// Import tattoo style images (kept from original)
import traditional from './assets/tat1.jpg';
import newSchool from './assets/tat2.png';
import anime from './assets/tat3.png';
import fineline from './assets/tat4.jpg';
import geometric from './assets/tat5.jpg';
import microRealism from './assets/tat6.jpg';
import realism from './assets/tat7.jpg';
import dotWork from './assets/tat8.jpg';
import darkArt from './assets/tat9.jpg';
import flowers from './assets/tat10.jpg';
import surrealism from './assets/tat11.jpg';
import trashPolka from './assets/tat12.jpg';

const genres = [
  { name: 'Traditional', image: traditional },
  { name: 'New School', image: newSchool },
  { name: 'Anime', image: anime },
  { name: 'Fineline', image: fineline },
  { name: 'Geometric', image: geometric },
  { name: 'Micro Realism', image: microRealism },
  { name: 'Realism', image: realism },
  { name: 'Dot Work', image: dotWork },
  { name: 'Dark Art', image: darkArt },
  { name: 'Flowers', image: flowers },
  { name: 'Surrealism', image: surrealism },
  { name: 'Trash Polka', image: trashPolka },
];

const cities = [
  'Tel Aviv',
  'Jerusalem',
  'Haifa',
  'Beer Sheva',
  'Eilat',
  'Netanya',
  'Herzliya',
  'Ramat Gan',
  'Ashdod',
  'Petah Tikva'
];

const SearchSection = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showStyleFilter, setShowStyleFilter] = React.useState(false);
  const [showLocationFilter, setShowLocationFilter] = React.useState(false);
  const [selectedStyle, setSelectedStyle] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [filteredGenres, setFilteredGenres] = React.useState(genres);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (selectedStyle) params.append('style', selectedStyle.name);
    if (selectedLocation) params.append('location', selectedLocation);
    history.push(`/search?${params.toString()}`);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // Here you would typically send the image to your AI service
      // and get back style recommendations
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedStyle(null);
    setSelectedLocation('');
    setFilteredGenres(genres);
    setSelectedImage(null);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative w-full max-w-2xl mx-auto ${showStyleFilter ? 'mb-80' : 'mb-0'}`}>        {/* Main Search Options */}
        <div className="flex flex-col space-y-4">
          {/* Text Search */}
          <div className="relative flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for tattoo artist by name..."
                className="w-full h-14 px-6 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 pr-24"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 px-6 py-2 rounded-lg text-white hover:bg-purple-700"
              >
                Search
              </button>
            </div>
          </div>

          {/* Divider with "or" text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-gray-400 bg-black/30">or</span>
            </div>
          </div>

          {/* AI Image Search */}
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-violet-800 to-fuchsia-800 text-white hover:from-violet-900 hover:to-fuchsia-900 transition-all"
            >
              <Image className="w-5 h-5" />
              Find Artists Using AI Image Analysis
            </button>

            {/* Explanation text */}
            <p className="text-sm text-gray-400 text-center max-w-md py-6">
              Upload a tattoo image and our AI will analyze its style to find artists who specialize in similar work
            </p>

            {/* Preview uploaded image if exists */}
            {selectedImage && (
              <div className="mt-4 relative group">
                <img
                  src={selectedImage}
                  alt="Uploaded tattoo reference"
                  className="h-40 object-cover rounded-lg border-2 border-purple-500"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-white hover:text-red-500"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setShowStyleFilter(!showStyleFilter);
              setShowLocationFilter(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${selectedStyle
                ? 'border-purple-500 text-purple-500'
                : 'border-gray-600 text-gray-300'
              }`}
          >
            <Filter className="w-4 h-4" />
            {selectedStyle ? selectedStyle.name : 'Style'}
          </button>

          <button
            onClick={() => {
              setShowLocationFilter(!showLocationFilter);
              setShowStyleFilter(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${selectedLocation
                ? 'border-purple-500 text-purple-500'
                : 'border-gray-600 text-gray-300'
              }`}
          >
            <MapPin className="w-4 h-4" />
            {selectedLocation || 'Location'}
          </button>

          {(selectedStyle || selectedLocation || selectedImage) && (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Dropdowns Container */}
        <div className="relative">
          {/* Style Filter Dropdown */}
          {showStyleFilter && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[1500px] z-50 ">
              <div>
                <GenrePicker
                  genres={filteredGenres}
                  onSelectGenre={(genre) => {
                    setSelectedStyle(genre);
                    setShowStyleFilter(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Location Filter Dropdown */}
          {showLocationFilter && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[220px] z-50 mt-4">
              <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-lg max-h-60 overflow-y-auto">
                {cities.map((city) => (
                  <button
                    key={city}
                    className="w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => {
                      setSelectedLocation(city);
                      setShowLocationFilter(false);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;