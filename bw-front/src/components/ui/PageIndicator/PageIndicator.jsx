import './PageIndicator.css';

import React from 'react';
import PropTypes from 'prop-types';

const UIPageIndicator = ({ page }) => {
  return (
    <div className="indicator">
      <svg width="1" height="34" viewBox="0 0 1 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1" height="34" rx="0.5" fill="#FFD700" fillOpacity="0.76" />
      </svg>

      <span className="page">{page}</span>
    </div>
  );
};

UIPageIndicator.propTypes = {
  page: PropTypes.string.isRequired,
};

export default UIPageIndicator;
