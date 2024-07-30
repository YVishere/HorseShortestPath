let graph = Array.from({length: 8}, () => Array.from({length: 8}, () => 0));
let visited = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
let dist = Array.from({length: 8}, () => Array.from({length: 8}, () => Number.MAX_VALUE));
let path = Array.from({length: 8}, () => Array.from({length: 8}, () => 0));
let c = 0;
graphAllPaths();
knightmoves([3,3], [4,3]);

function mindistance(dist, visited){
    let min = Number.MAX_VALUE;
    let min_indexi = -1;
    let min_indexj = -1;

    for (let i =0; i<8; i++){
        for (let j =0; j < 8;j++){
            if (visited[i][j] == false && dist[i][j] <= min){
                min = dist[i][j];
                min_indexi = i;
                min_indexj = j;
            }
        }
    }

    return [min_indexi, min_indexj];
}

function djikstra(start){
    dist[start[0]][start[1]] = 0;

    for (let c = 0; c < 63; c++){
        let u = mindistance(dist, visited);

        visited[u[0]][u[1]] = true;
        element = graph[u[0]][u[1]];
        for (let k = 0; k < element.length; k++){
            elem = element[k];
            if (!visited[elem[0]][elem[1]]){
                dist[elem[0]][elem[1]] = dist[u[0]][u[1]] + 1;
                path[elem[0]][elem[1]] = [u[0], u[1]];
                console.log(elem);
            }
        }
    }
    return dist;
}

function knightmoves(start, end){
    dist = djikstra(start);
    console.log(dist[end[0]][end[1]]);
    pa = checkPath(end);
    console.log(JSON.stringify(pa.reverse()));
}

function checkPath(start){
    let returnPath = [];
    ind1 = start[0];
    ind2 = start[1];
    try{
        while(path[ind1] != null || path[ind1][ind2] != null){
            returnPath.push([ind1,ind2]);
            temp = path[ind1][ind2];
            ind1 = temp[0];
            ind2 = temp[1];
        }
    }
    catch(err){
        return returnPath;
    }
    return returnPath;
}

function graphAllPaths(){
    for (let i = 0; i < 8;i++){
        for (let j = 0; j < 8; j++){
            let validMoves = generateValidMoves([i,j]);
            graph[i][j] = validMoves;
            console.log(JSON.stringify(validMoves));
        }
    }
}

function generateValidMoves(start){
    let startX = start[0];
    let startY = start[1];
    let validMoves = [];
    for (let x = -2; x <=2; x++){
        for (let y = -2; y<=2;y++){
            if (x ==0 || y==0 || x==y || x==-y){
                continue;
            }
            if (startX + x > 7 || startX + x < 0 || startY + y > 7 || startY + y < 0){
                continue;
            }
            validMoves.push([startX + x, startY + y]);
        }
    }
    return validMoves;
}