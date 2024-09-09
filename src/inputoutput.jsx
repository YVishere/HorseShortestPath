import horse from './assets/LightKnight.webp';
import './inputoutput.css';
import './board.jsx';
import { useEffect, useState, useRef } from 'react';
import Knight from './knightmoves.js';
import End from './ending.jsx';

function getCenterCoordinates(element){
    if (element){
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width/2,
            y: rect.top + rect.height/2
        };
    }
    return null;
}

function getWidthHeight(element){
    if (element){
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    }
    return null;
}

function generateAllCoordinates(arr){
    let coordinates = [];
    for (let i = 0; i < arr.length; i++){
            let e = document.getElementById(`${arr[i][0]}-${arr[i][1]}`);
            let x = getCenterCoordinates(e);
            coordinates.push(x);
    }
    return coordinates;
}

function autoPlaceHorse(horseX, horseY, c){
    const graph = new Knight(0,0,0,0).graph;
    let points  = graph[c.x][c.y];
    let temp = null;
    let coordinates = generateAllCoordinates(points);
    let closestCoordinate = null;
    let minDistance = Infinity;

    for (let i = 0; i < coordinates.length; i++) {
        let dx = coordinates[i].x - horseX;
        let dy = coordinates[i].y - horseY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
            minDistance = distance;
            closestCoordinate = coordinates[i];
            temp = i;
        }
    }
    

    let e = document.getElementById(`${points[temp][0]}-${points[temp][1]}`);
    let w = getWidthHeight(e).width;
    let h = getWidthHeight(e).height;
    let rect = e.getBoundingClientRect();
    let ex = rect.left + w;
    let ey = rect.top + h; //check this

    if (horseX > ex || horseY > ey || horseX < rect.left || horseY < rect.top){
        return null;
    }

    return { x: closestCoordinate.x, y: closestCoordinate.y, point: points[temp]};
}

export default function main(){

    const knight = new Knight(0,0,0,0);

    const [userPath, setUserPath] = useState([]);
    const [end, setEnd] = useState(false);
    const [oldCoordinates, setOldCoordinates] = useState({x: 0, y: 0});
    const horseRef = useRef(null);
    const [drag, setDrag] = useState({cond: false, event: null});
    const [seeHorse, setSeeHorse] = useState(false);
    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    const [horseCoordinates, setHorseCoordinates] = useState({x: 0, y: 0});

    const RenderHorse = () => {
        let w = getWidthHeight(document.getElementById(`${coordinates.x}-${coordinates.y}`)).width;
        let h = getWidthHeight(document.getElementById(`${coordinates.x}-${coordinates.y}`)).height;
        return (
        <>
            <div className = "horse-container" style={{left: `${horseCoordinates.x}px`, top: `${horseCoordinates.y}px`, transform: 'translate(-50%, -50%)', width: w, height:h}}> 
                <img draggable = "false" src = {horse} alt = "Horse" id = "horse" style = {{pointerEvents: 'all'}} ref= {horseRef} onMouseDown = {handleHorseClick} onMouseMove={mouseMove} onMouseUp={leaveHorse}/>
            </div>
        </>
        );
    };

    const mouseMove = (e) => {
        if (!drag.cond || !horseRef.current|| !drag.event){
            return;
        }
        setHorseCoordinates({x: e.clientX, y: e.clientY});
    };

    const handleHorseClick = (e) => {
        if (!horseRef.current || end){
            return;
        }
        setOldCoordinates(horseCoordinates);
        setDrag({cond: true, event: e});
    }

    const leaveHorse = (e) => {
        let autoPlaceHors = autoPlaceHorse(horseCoordinates.x, horseCoordinates.y, coordinates);
        if (!autoPlaceHors){
            setDrag({cond: false, event: null});
            setHorseCoordinates(oldCoordinates);
            return;
        }
        setHorseCoordinates({x: autoPlaceHors.x, y: autoPlaceHors.y});
        setCoordinates({x: autoPlaceHors.point[0], y: autoPlaceHors.point[1]});
        setDrag({cond: false, event: null});
    };

    const handleClick = () => {
        let nx = document.getElementById('startIndexX').value;
        let ny = document.getElementById('startIndexY').value;
        let endx = document.getElementById('endIndexX').value;
        let endy = document.getElementById('endIndexY').value;

        if (nx == null || ny == null || !Number.isInteger(parseInt(nx)) || !Number.isInteger(parseInt(ny)) || nx < 1 || nx > 8 || ny < 1 || ny > 8 || endx == null || endy == null || !Number.isInteger(parseInt(endx)) || !Number.isInteger(parseInt(endy)) || endx < 1 || endx > 8 || endy < 1 || endy > 8){
            document.getElementById('error-message').innerText = "Invalid";
            return;
        }
        else{
            document.getElementById('error-message').innerText = "";
        }

        setCoordinates({x: nx-1, y: 8 - ny});
        setSeeHorse(true);
        setUserPath([]);
        setEnd(false);
    }

    useEffect(() => {
        if (!horseRef.current){
            setEnd(false);
            return;
        }
        let endx = document.getElementById('endIndexX').value;
        let endy = document.getElementById('endIndexY').value;

        if (endx == coordinates.x + 1 && endy == 8 - coordinates.y){
            setEnd(true);
        }
        else{
            setEnd(false);
        }
    },[coordinates]);

    useEffect(() => {
        const horseElem = document.getElementById(`${coordinates.x}-${coordinates.y}`);
        if (document.getElementById('horse')){
            let x = getCenterCoordinates(horseElem);
            setHorseCoordinates(x);
        }   
    }, [seeHorse, coordinates]);

    //infinite loop if I add an addEventListener directly

    useEffect(() => {
        const handleResize = () => {
            if (document.getElementById('horse')){
                let x = getCenterCoordinates(document.getElementById(`${coordinates.x}-${coordinates.y}`));
                setHorseCoordinates(x);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useEffect(() => {
        if (!horseRef.current){
            return;
        }
        let up = userPath;
        setUserPath(up.concat([coordinates.x + 1, 8 - coordinates.y]));
    }, [coordinates]);

    return(
        <> 
            <div className = "start">
                <input type = "text" id = "startIndexX" placeholder="Start position X" required/>
                <input type = "text" id = "startIndexY" placeholder="Start Position Y" required/>
            </div>
            <div className = "start">
                <input type = "text" id = "endIndexX" placeholder="End position X" required/>
                <input type = "text" id = "endIndexY" placeholder="End Position Y" required/>
            </div>
            <div>
                <button id = "startHorse" onClick={handleClick}>Start</button>
                <label id = "error-message"></label>
            </div>
            {seeHorse && <RenderHorse/>}
            {end && <End start = {{x:document.getElementById('startIndexX').value, y:document.getElementById('startIndexY').value}} end = {{x:document.getElementById('endIndexX').value, y:document.getElementById('endIndexY').value}} path = {userPath}/>}
        </>
    );
}