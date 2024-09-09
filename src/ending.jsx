import './ending.css';
import Knight from './knightmoves.js';

export default function ending({start, end, path}){
    let knight = new Knight(start.x - 1, start.y - 1, end.x - 1, end.y - 1);
    return (
        <div id = "endLine">
            You have learned nothing from this.
            <div className = "CompInfo">Computer did this in {knight.finalPath.length - 1} move(s)</div>
            <div className = "CompInfo">Going in the path: {knight.finalPath.map((p) => {
                return `[${p[0] + 1}, ${p[1] + 1}] `;
            })}</div>
            <div className = "UserInfo">You did this in {(path.length/2) - 1} move(s)</div>
            <div className = "UserInfo">Going in the path: {path.filter((_, i) => i%2==0).map((_, index) => {
                return `[${path[2*index]}, ${path[(2*index)+1]}] `;
            })}</div>
        </div>
    );
}