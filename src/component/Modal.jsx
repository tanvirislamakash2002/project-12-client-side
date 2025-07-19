import { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Stop click bubbling
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full relative overflow-y-auto max-h-[90vh]"
        onClick={stopPropagation}
      >
        {/* Close button top-right */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
