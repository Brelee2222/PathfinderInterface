declare export class Pathfinder {
    position : {[index : any] : PathNode};
    getPaths(position) : [PathNode];
    startPathfinding(startPos : any, endPos : any) : FollowPath;
}

declare export class PathNode {
    parentNodes : [PathNode];
    parentLinks : [PathNode];
    childLinks : [PathNode];
    position : any;
    distance : number;

    constructor(position : any, distance : number, parentNode : PathNode, parentLinks : [PathNode]);

    isClearPath(position : any) : boolean;
    distanceTo(position : any) : number;
}