class Pathfinder {

    positions = {};

    maxDistance;

    startPathfinding(startPos, endPos, minDistanceFromEnd = 1) {
        this.endPos = endPos;
        this.maxDistance = NaN;
        let rootNode = new PathNode(startPos, 0, null, []);
        let checkNodes = [rootNode];
        let endingPos;
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
                        if(child.distanceTo(endPos) <= minDistanceFromEnd) {
                            endingPos = child;
                            this.maxDistance = child.distance;
                        }
                        let v = true;
                        for(let path of node.parentLinks)
                            if(!child.parentLinks.includes(path))
                                if(child.isClearPath(path)) {
                                    v = false;
                                    path.childLinks.push(child);
                                    child.parentLinks.push(path);
                                }
                        if(v) {
                            node.childLinks.push(child);
                            child.parentLinks.push(node);
                        }
                        if(!child.parentNodes.includes(node))
                            child.parentNodes.push(node);
                    }
                }
            }
        }

        if(!endingPos)
            return;
        checkNodes = [rootNode];
        while(checkNodes.length) {
            let checkingNodes = checkNodes;
            checkNodes = [];
            for(let node of checkingNodes) {
                for(let child of node.childLinks){
                    let distance = child.distanceTo(node.position) + node.distance;
                    if(distance < child.distance) {
                        child.distance = distance;
                        child.parentNodes[0] = node;
                        if(!checkNodes.includes(child))
                            checkNodes.push(child);
                    }
                }
            }
        }
        let path = new FollowPath(undefined, endingPos.position);
        while(endingPos.parentNodes[0])
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
        if(!this.parentLinks.length)
            if(parentNode) {
                this.parentLinks.push(parentNode);
                parentNode.childLinks.push(this);
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