class Pathfinder {

    positions = {};

    maxDistance;

    startPathfinding(startPos, endPos, minDistanceFromEnd = 1) {
        this.positions
        this.endPos = endPos;
        this.maxDistance = NaN;
        let rootNode = new PathNode(startPos, 0, null, []);
        let checkNodes = [rootNode];
        (this.positions = {})[startPos] = rootNode;

        while(checkNodes.length) {
            let checkingNodes = checkNodes;
            checkNodes = [];
            for(let node of checkingNodes) {
                if(this.maxDistance < node.distance)
                    continue;
                for(let child of this.getPaths(node)) {
                    if(node.distance < child.distance) {
                        if(!checkNodes.includes(child))
                            checkNodes.push(child);
                        if(child.distanceTo(endPos) <= minDistanceFromEnd)
                            this.maxDistance = child.distance;
                        if(!child.parentNodes.includes(node)) {
                            for(let path of node.parentLinks) 
                                if(path.isClearPath(child)) {
                                    path.childLinks.push(child);
                                    child.parentLinks.push(path);
                                }
                            child.parentNodes.push(node);
                        }
                    }
                }
            }
        }
        console.log("moving on")
        let endNode = this.positions[endPos];
        if(!endNode)
            return;
        checkNodes = [rootNode];
        while(checkNodes.length) {
            let checkingNodes = checkNodes;
            checkNodes = [];
            for(let node of checkingNodes) {
                for(let child of node.childLinks){
                    let distance = child.distanceTo(node.position) + node.distance;
                    if(distance <= child.distance) {
                        child.distance = distance;
                        child.parentNodes[0] = node;
                        if(!checkingNodes.includes(child))
                            checkingNodes.push(child);
                    }
                }
            }
        }
        let path = new FollowPath(undefined, endPos);
        while(endNode.parentNodes[0])
            path = new FollowPath(path, (endNode = endNode.parentNodes[0]).position);
        return path;
    }

    getPaths(node) {
        return [];
    }
}

class PathNode {
    parentNodes = [];
    parentLinks = [];
    childLinks = [];
    position;
    distance;

    constructor(position, distance, parentNode, parentLinks) {
        this.position = position;
        this.distance = distance;
        this.parentNodes = [parentNode];
        for(let parentLink of parentLinks)
            if(this.isClearPath(parentLink)) {
                this.parentLinks.push(parentLink);
                parentLink.childLinks.push(this);
            }
        if(!parentLinks.length)
            if(parentNode) {
                this.parentLinks.push(parentNode);
                parentNode.childLinks.push(this)
            } else
                this.parentLinks.push(this);
    }

    isClearPath(position) {
        return false;
    }

    distanceTo(position) {
        return 0;
    }
}

class FollowPath {
    next;
    position;

    constructor(next, position) {
        this.next = next;
        this.position = position;
    }
}

module.exports = {
    FollowPath,
    PathNode,
    Pathfinder
}