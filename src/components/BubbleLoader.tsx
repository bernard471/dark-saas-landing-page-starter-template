import React from 'react';

export const BubbleLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 bg-teal-500 rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    </div>
  );
};
