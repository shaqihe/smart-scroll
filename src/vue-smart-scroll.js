import util from './uril'

// 常量定义
const STATUS_MEMORY = 1,
    STATUS_VIEW = 2,
    DATASET_ID = 'exSmartId';


// get block place holder
const getHolder = (node, cache) => {
    let div = document.createElement("div");
    div.className = node.className;
    div.setAttribute(DATASET_ID, u._$uniqueID());
    div.style.height = cache.height + 'px';
    return div;
};


// check node visible
const isVisible = (node, port, cache) => {
    // check cache
    if (!cache) {
        cache = {
            top: util.offset(node, viewPort).y,
            height: node.offsetHeight
        };
    }

    // check visible
    var btm1 = cache.top + cache.height,
        btm2 = port.top + port.height;
    return !(btm1 < port.top || cache.top > btm2);
};

// move node to memory
const moveToMemory = (node, cache) => {
    if (!cache){
        cache = {
            top: util.offset(node, viewPort).y,
            height: node.offsetHeight
        };
        cache.source = node;
        cache.holder = getHolder(node, cache);
        nodeMap[e._$dataset(cache.holder,DATASET_ID)] = cache;
    }

    cache.status = STATUS_MEMORY;
    // replace node
    node.insertAdjacentElement('afterEnd',cache.holder);
    e._$removeByEC(node);
};


export default {

    inserted: (el, binding, vnode) => {
        let className = value,
            viewPort = el,
            nodeMap = {}; // top,height,holder,source,status


    }
}
