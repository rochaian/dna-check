import React from 'react';

interface ResultPopupProps {
  message: string; // Mensagem a ser exibida no popup
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Overlay */}
      <div className="bg-white p-20 rounded-lg shadow-lg relative"> {/* Caixa do alerta */}
        {/* Botão de fechamento */}
        <button
          className="absolute top-2 botton-4 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
            <span className='font-bold p-2 text-black'>X</span>
        </button>

        {/* Mensagem do alerta */}
        <div className="text-center text-gray-800 pt-2 text-[3rem]">
          DNA DE UM <span className='font-bold'>{message} {message === 'SIGMANO' ? '🤖' : '😎'}</span> {/* Exibe a mensagem */}
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
