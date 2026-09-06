"use client";

import "./SearchModal.scss";
import "./SearchModal.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const SearchModal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");

  const searchDomain = "ewubd.edu";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Create Google search URL
      const googleSearchUrl = `https://www.google.com/search?q=site:${searchDomain} ${encodeURIComponent(
        searchQuery.trim()
      )}&igu=1&hl=en&safe=off&filter=0&num=10&start=0&gbv=1`;
      setSearchUrl(googleSearchUrl);
      setShowResults(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchUrl("");
  };

  const goBack = () => {
    setShowResults(false);
  };

  return (
    <div
      className="offcanvas offcanvas-top search-modal-part"
      tabIndex={-1}
      id="offcanvasTopSearch"
      aria-labelledby="offcanvasTopLabel"
    >
      <div className="p-3 offcanvas-body">
        <div className="d-flex justify-content-between offcanvas-header quick-links-header">
          <div className="d-flex align-items-center">
            {showResults && (
              <button
                className="bg-transparent border-0 text-white me-3"
                onClick={goBack}
                type="button"
              >
                <Icon
                  icon="material-symbols:arrow-back"
                  width="24"
                  height="24"
                />
              </button>
            )}
            <h1>Search</h1>
          </div>
          <button
            className="bg-transparent border-0 text-2 text-white"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={clearSearch}
          >
            <Icon icon="formkit:close" width="26" height="30" />
          </button>
        </div>

        <div className="search-modal">
          {!showResults ? (
            // Search Input View
            <form onSubmit={handleSearch} className="search-input">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <button type="submit">
                <Icon
                  icon="material-symbols:search-rounded"
                  width="24"
                  height="24"
                />
              </button>
            </form>
          ) : (
            // Search Results View
            <div className="search-results-container">
              <div className="search-info mb-3">
                <div className="d-flex align-items-center">
                  <form
                    onSubmit={handleSearch}
                    className="search-input flex-grow-1 me-2"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <button type="submit">
                      <Icon
                        icon="material-symbols:search-rounded"
                        width="20"
                        height="20"
                      />
                    </button>
                  </form>
                </div>
              </div>

              <div className="iframe-container">
                <iframe
                  src={searchUrl}
                  width="100%"
                  height="500"
                  title="Google Search Results"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  loading="lazy"
                  className="frame-body"
                >
                  <p>
                    Your browser does not support iframes.
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here to open search results
                    </a>
                  </p>
                </iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
