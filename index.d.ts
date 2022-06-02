declare export class Pathfinder {
    positions : {[index : any] : PathNode};
    getPaths(node : PathNode) : [PathNode];
    startPathfinding(startPos : any, endPos : any, minDistanceFromEnd : number) : FollowPath;
}

declare export class PathNode {
    parentNodes : [PathNode];
    parentLinks : [PathNode];
    childLinks : [PathNode];
    position : any;
    distance : number;

    constructor(position : any, distance : number, parentNode : PathNode, parentLinks : [PathNode]);

    isClearPath(node : PathNode) : boolean;
    distanceTo(position : any) : number;
}

declare export class FollowPath {
    next : FollowPath;
    position : any;
}