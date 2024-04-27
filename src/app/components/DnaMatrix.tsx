'use client'
import React, { useRef, useState } from 'react';
import { checkDna } from '../service/apiService';
import ResultPopup from './ResultPopup';

const allowedChars = ['A', 'T', 'C', 'G'];

const DnaMatrix: React.FC = () => {
    const [rows, setRows] = useState(4); //Variável de estado das Linhas
    const [cols, setCols] = useState(4); //Variável de estado das Colunas

    const [showPopup, setShowPopup] = useState(false); // Controla a visibilidade do popup
    const [result, setResult] = useState('');

    //Variável de estado da matriz bidimencional que armazena as informações do DNA
    const [dna, setDna] = useState(Array(rows).fill(Array(cols).fill('')));

    /* handleCheckDNA
    Processo de verificação do DNA */
    function handleCheckDNA(): void {

        console.log('Checando DNA');

        console.log(dna);

        checkDna(dna).then((result) => {
            // Lida com o resultado retornado pela API
            console.log('Resultado da API:', result);
            setResult(result.dnaResult);
            handleShowPopup();

        });


        // // Verifica se há sequências de quatro letras iguais no DNA
        // const hasSequences = checkDnaSequences(dna);

        // const horizontal = checkHorizontal(dna);
        // const vertical = checkVertical(dna);
        // const diagonalP = checkDiagonalPrincipal(dna);
        // const diagonalS = checkDiagonalSecundaria(dna);

        // console.log('horizontal', horizontal);
        // console.log('vertical', vertical);
        // console.log('diagonalP', diagonalP);
        // console.log('diagonalS', diagonalS);

        // // Imprime o resultado no console
        // console.log('O DNA contém sequências iguais de quatro letras:', hasSequences);
    }


    const handleShowPopup = () => {
        setShowPopup(true); // Define o estado para exibir o popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Define como invisível
    };


    // Função para verificar sequências horizontais de quatro letras iguais
    function checkHorizontal(dna: string[][]): boolean {
        for (let i = 0; i < dna.length; i++) { // Para cada linha
            for (let j = 0; j <= dna[i].length - 4; j++) { // Verifica segmentos de 4 colunas
                const segment = dna[i].slice(j, j + 4); // Segmento de quatro letras
                if (segment.every((val) => val === segment[0] && segment[0] !== '')) { // Checa se todas as letras são iguais
                    return true;
                }
            }
        }
        return false;
    }

    // Função para verificar sequências verticais de quatro letras iguais
    function checkVertical(dna: string[][]): boolean {
        for (let j = 0; j < dna[0].length; j++) { // Para cada coluna
            for (let i = 0; i <= dna.length - 4; i++) { // Verifica segmentos de 4 linhas
                const segment = [dna[i][j], dna[i + 1][j], dna[i + 2][j], dna[i + 3][j]]; // Segmento vertical de quatro letras
                if (segment.every((val) => val === segment[0] && segment[0] !== '')) { // Checa se todas as letras são iguais
                    return true;
                }
            }
        }
        return false;
    }

    // Função para verificar sequências diagonais de quatro letras iguais (principal)
    function checkDiagonalPrincipal(dna: string[][]): boolean {
        for (let i = 0; i <= dna.length - 4; i++) { // Para cada linha com margem para diagonal
            for (let j = 0; j <= dna[i].length - 4; j++) { // Para cada coluna com margem para diagonal
                const segment = [dna[i][j], dna[i + 1][j + 1], dna[i + 2][j + 2], dna[i + 3][j + 3]]; // Segmento diagonal de quatro letras
                if (segment.every((val) => val === segment[0] && segment[0] !== '')) { // Checa se todas as letras são iguais
                    return true;
                }
            }
        }
        return false;
    }

    // Função para verificar sequências diagonais de quatro letras iguais (secundária)
    function checkDiagonalSecundaria(dna: string[][]): boolean {
        for (let i = 0; i <= dna.length - 4; i++) { // Para cada linha com margem para diagonal
            for (let j = 3; j < dna[i].length; j++) { // Para cada coluna da direita para a esquerda com margem para diagonal
                const segment = [dna[i][j], dna[i + 1][j - 1], dna[i + 2][j - 2], dna[i + 3][j - 3]]; // Segmento diagonal reverso de quatro letras
                if (segment.every((val) => val === segment[0] && segment[0] !== '')) { // Checa se todas as letras são iguais
                    return true;
                }
            }
        }
        return false;
    }

    // Função geral para checar sequências de quatro letras iguais nas direções horizontais, verticais e diagonais
    function checkDnaSequences(dna: string[][]): boolean {
        return (
            checkHorizontal(dna) ||
            checkVertical(dna) ||
            checkDiagonalPrincipal(dna) ||
            checkDiagonalSecundaria(dna)
        );
    }


    /* HandleChange
    Processo de verificação de caracteres permitidos, a atualização da matriz dna, 
    e a manutenção da lógica de mudança para a linha e coluna correspondentes. */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        row: number,
        col: number
    ) => {
        const newValue = e.target.value.toUpperCase();
        if (!allowedChars.includes(newValue) && newValue !== '') {
            return;
        }

        const newDna = dna.map((r, rowIndex) => {
            if (rowIndex === row) {
                return r.map((c: any, colIndex: number) => {
                    if (colIndex === col) {
                        return newValue;
                    }
                    return c;
                });
            }
            return r;
        });

        setDna(newDna);


        // // Move para o próximo input
        // const nextInput = document.querySelector(`#input-${row}-${col + 1}`);
        // if (nextInput) {
        //     (nextInput as HTMLInputElement).focus();
        // }


    };

    /* HandleChange
    Função que verificar a tecla precionada, se for DELETE ele volta para o input anterior, 
    demais teclas de setas move o foco dos inputs.*/
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        row: number,
        col: number
    ) => {
        const input = e.target as HTMLInputElement;
        console.log(e.key);

        if (e.key === 'Backspace' && input.value === '') {
            // Volta para o campo anterior
            const prevInput = document.querySelector(`#input-${row}-${col - 1}`);
            if (prevInput) {
                const prevInputElement = prevInput as HTMLInputElement;
                prevInputElement.select(); // Seleciona todo o texto do input 
                prevInputElement.focus(); // Coloca o foco no input
            }
        } else if (e.key === 'ArrowRight') {
            // Move para o próximo campo
            const nextInput = document.querySelector(`#input-${row}-${col + 1}`);
            if (nextInput) {
                const nextInputElement = nextInput as HTMLInputElement;
                nextInputElement.focus(); // Coloca o foco no input
                nextInputElement.select(); // Seleciona todo o texto do input 
            }
        } else if (e.key === 'ArrowLeft') {
            // Move para o campo anterior
            const prevInput = document.querySelector(`#input-${row}-${col - 1}`);
            if (prevInput) {
                const prevInputElement = prevInput as HTMLInputElement;
                prevInputElement.select(); // Seleciona todo o texto do input 
                prevInputElement.focus(); // Coloca o foco no input
            }
        } else if (e.key === 'ArrowDown') {
            // Move para a linha abaixo
            const downInput = document.querySelector(`#input-${row + 1}-${col}`);
            if (downInput) {
                const downInputElement = downInput as HTMLInputElement;
                downInputElement.focus(); // Coloca o foco no input
                downInputElement.select(); // Seleciona todo o texto do input                
            }
        } else if (e.key === 'ArrowUp') {
            // Move para a linha acima
            const upInput = document.querySelector(`#input-${row - 1}-${col}`);
            if (upInput) {
                const upInputElement = upInput as HTMLInputElement;
                upInputElement.focus(); // Coloca o foco no input
                upInputElement.select(); // Seleciona todo o texto do input   
            }
        }
    };

    return (
        <>
            {/* Exibe o AlertPopup somente se showPopup for verdadeiro */}
            {showPopup && <ResultPopup message={result} onClose={handleClosePopup} />}

            {/* <ResultPopup message="Esta é uma mensagem de alerta!" /> */}
            <div className='text-center'>

                <div className='text-center'>
                    <div className='flex-colunms'>
                        <label className='text-[28px] block leading-[18px]'> {rows}</label>
                        <label className='text-[12px] text-[#afb3ff]'>Linhas</label>
                    </div>
                    <input
                        className='w-[40vw]'
                        type="range"
                        min="1"
                        max="20"
                        value={rows}
                        onChange={(e) => {
                            setRows(parseInt(e.target.value));
                            setDna(Array(parseInt(e.target.value)).fill(Array(cols).fill(''))); //Atualiza matriz alterando a quantidade de linhas
                        }}
                    />
                </div>
                <div className='text-center'>
                    <div className='flex-colunms'>
                        <label className='text-[28px] block leading-[18px] pt-2'>{cols} </label>
                        <label className='text-[12px] text-[#afb3ff]'>Colunas</label>
                    </div>

                    <input
                        className='w-[40vw] bg-[#e81153]'
                        type="range"
                        min="1"
                        max="20"
                        value={cols}

                        onChange={(e) => {
                            setCols(parseInt(e.target.value));
                            setDna(Array(rows).fill(Array(parseInt(e.target.value)).fill(''))); //Atualiza matriz alterando a quantidade de Colunas
                        }}
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 50px)`, gap: '5px', padding: '50px', justifyContent: 'center' }}>
                    {dna.map((row, rowIndex) => (
                        <React.Fragment key={`row-${rowIndex}`}>
                            {row.map((col: string | number | readonly string[] | undefined, colIndex: number) => (
                                <input
                                    key={`input-${rowIndex}-${colIndex}`}
                                    id={`input-${rowIndex}-${colIndex}`}
                                    type="text"
                                    value={col}
                                    onFocus={(e) => e.target.select()}
                                    maxLength={1}
                                    style={{ textAlign: 'center', fontSize: '30px', color: 'black' }}
                                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div>
                    <button
                        className="
                            rounded-[3rem]
                            bg-[#e81153]
                            text-white
                            font-bold
                            px-[4rem]
                            py-[0.8rem]
                            rounded-lg
                            shadow-md
                            hover:bg-[#ff135b]
                            focus:outline-none
                            focus:ring
                            focus:ring-blue-300
                            transition
                            ease-in-out
                            duration-200
                        "
                        style={{ borderRadius: '3rem !important' }}
                        onClick={handleCheckDNA} // Chama o callback quando clicado
                    >CHECK DNA</button>
                </div>
            </div>
        </>
    );
};

export default DnaMatrix;
