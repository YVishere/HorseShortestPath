

class knight{
    constructor(startx, starty, endx, endy){    
        this.graph = Array.from({length: 8}, () => Array.from({length: 8}, () => 0));
        this.visited = Array.from({length: 8}, () => Array.from({length: 8}, () => false));
        this.dist = Array.from({length: 8}, () => Array.from({length: 8}, () => Number.MAX_VALUE));
        this.path = Array.from({length: 8}, () => Array.from({length: 8}, () => 0));
        this.c = 0;
        this.finalPath = [];
        this.graphAllPaths();
        this.knightmoves([startx,starty], [endx,endy]);
    }

    mindistance(dist, visited){
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

    djikstra(start){
        this.dist[start[0]][start[1]] = 0;
        let element = null;
        let elem = null;

        for (let c = 0; c < 63; c++){
            let u = this.mindistance(this.dist, this.visited);
            
            this.visited[u[0]][u[1]] = true;
            element = this.graph[u[0]][u[1]];
            for (let k = 0; k < element.length; k++){
                elem = element[k];
                if (!this.visited[elem[0]][elem[1]]){
                    this.dist[elem[0]][elem[1]] = this.dist[u[0]][u[1]] + 1;
                    this.path[elem[0]][elem[1]] = [u[0], u[1]];
                }
            }
        }
        return this.dist;
    }

    knightmoves(start, end){
        this.dist = this.djikstra(start);
        console.log(this.dist[end[0]][end[1]]);
        let pa = this.checkPath(end);
        this.finalPath = pa.reverse();
    }

    checkPath(start){
        let returnPath = [];
        let ind1 = start[0];
        let ind2 = start[1];
        let temp = null;
        try{
            while(this.path[ind1] != null || this.path[ind1][ind2] != null){
                returnPath.push([ind1,ind2]);
                temp = this.path[ind1][ind2];
                ind1 = temp[0];
                ind2 = temp[1];
            }
        }
        catch(err){
            return returnPath;
        }
        return returnPath;
    }

    graphAllPaths(){
        let validMoves = [];
        for (let i = 0; i < 8;i++){
            for (let j = 0; j < 8; j++){
                validMoves = this.generateValidMoves([i,j]);
                this.graph[i][j] = validMoves;
            }
        }
    }

    generateValidMoves(start){
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
}

export default knight;