import React, { useState } from 'react';

interface ResultPopupProps {
  message: string; // Mensagem a ser exibida no popup
}

const ResultPopup: React.FC<ResultPopupProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar visibilidade do alerta

  // Função para fechar o alerta
  const closeAlert = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Se o alerta não estiver visível, não exibe nada
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* Overlay */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative"> {/* Caixa do alerta */}
        {/* Botão de fechamento */}
        <button
          className="absolute top-2 botton-4 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeAlert}
        >
            <span className='font-bold p-2 text-black'>X</span>
        </button>

        {/* Mensagem do alerta */}
        <div className="text-center text-gray-800 pt-2">
          {message} {/* Exibe a mensagem */}
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
