import util from './util'

// 常量定义
const STATUS_MEMORY = 1,
    STATUS_VIEW = 2,
    DATASET_ID = 'exSmartId',
    fragment = document.createDocumentFragment(); // node in memory


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
    if (!cache) {
        cache = {
            top: util.offset(node, viewPort).y,
            height: node.offsetHeight
        };
        cache.source = node;
        cache.holder = getHolder(node, cache);
        nodeMap[cache.holder.getAttribute(DATASET_ID)] = cache;
    }

    cache.status = STATUS_MEMORY;
    // replace node
    node.insertAdjacentElement('afterEnd', cache.holder);
    util.removeByEC(node);
};

// move node to page
const moveToPage = (holder, cache) => {
    holder.insertAdjacentElement('afterEnd', cache.source);
    cache.status = STATUS_VIEW;
    util.removeByEC(holder);
};

// check item block
const doCheckBlock = () => {
    let list = !className ?
        element.children || element.childNodes :
        util.getByClassName(className);

    let port = {
        top: viewPort.scrollTop,
        height: viewPort.clientHeight
    };

    list.forEach((it) => {
        var id = it.getAttribute(DATASET_ID),
            cache = nodeMap[id],
            visible = isVisible(it, port, cache);
        // move to cache
        if (!visible && (!cache || cache.status === STATUS_VIEW)) {
            moveToMemory(it, cache);
        }
        // move to page
        if (visible && !!cache && cache.status === STATUS_MEMORY) {
            moveToPage(it, cache);
        }
    })
};

export default {

    inserted: (element, binding, vnode) => {
        let className = value,
            viewPort = element,
            nodeMap = {};

        element.addEventListener("scroll", doCheckBlock, false);


    }
}
