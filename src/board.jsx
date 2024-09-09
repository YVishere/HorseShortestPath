import { useEffect, useState } from 'react';
import './board.css';

export default function Board() {
    const n = 8;
    const m = 8;
    const [chessBoard, setChessBoard] = useState([]);

    useEffect(() => {
        const result = [];
        for (let i = 0; i < n; i++) {
            const row = Array.from({ length: m });
            result.push(row);
        }
        setChessBoard(result);
    }, []);

    return (
        <div className="container">
            <div className="edge"></div>
            <div className="chessBoard">
                {chessBoard.length > 0 &&
                    chessBoard.map((row, rIND) => {
                        return (
                            <div className="row" key={rIND} id = {`rIND${rIND}`}>
                                {row.map((box, cIND) => {
                                    return (
                                        <div className={`box ${(rIND + cIND) % 2 === 0 ? 'white' : 'black'}`} key={cIND} id  = {`${cIND}-${rIND}`}>
                                            <div className = "index" id = {`${(rIND + cIND) % 2 === 0 ? 'black' : 'white'}`}>
                                                {cIND == 0 ? <b>{8-rIND}</b>: 
                                                    rIND == 7? <b>{cIND+1}</b>: null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}