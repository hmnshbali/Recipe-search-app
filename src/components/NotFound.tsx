import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">No recipes found</h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;