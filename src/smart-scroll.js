var toSmartScroll = (function() {
    // 常量定义
    const STATUS_MEMORY = 1,
        STATUS_VIEW = 2,
        DATASET_ID = 'exSmartId';

    let fragment = document.createDocumentFragment(),
        viewPort = '',
        nodeMap = {};

    let
        isRoot = (element) => {
            return element == document.body ||
                element == document.documentElement;
        },
        hasClass = (node, className) => {
            var cNames = node.className.split(/\s+/); //根据空格来分割node里的元素；
            for (var i = 0; i < cNames.length; i++) {
                if (cNames[i] == className) return true;
            }
            return false;
        };

    let util = {
        offset: (from, to) => {
            if (!from) {
                return null;
            }
            let node = from,
                result = {
                    x: 0,
                    y: 0
                },
                isroot, delta, border;
            while (!!node && node != to) {
                isroot = isRoot(node) || node == from;

                delta = isroot ? 0 : node.scrollLeft;
                border = parseInt(node.style.borderLeftWidth) || 0;
                result.x += node.offsetLeft + border - delta;
                delta = isroot ? 0 : node.scrollTop;
                border = parseInt(node.style.borderTopWidth) || 0;
                result.y += node.offsetTop + border - delta;
                node = node.offsetParent;
            }
            return result;
        },

        removeByEC: (node) => {
            if (!!node) {
                try {
                    fragment.appendChild(node);
                } catch (ex) {
                    console.error(ex);
                }
            }
        },

        getByClassName: (className) => {
            if (document.getElementByClassName) {
                return document.getElementByClassName(className) //FF下因为有此方法，所以可以直接获取到；
            }
            let nodes = document.getElementsByTagName("*"); //获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；
            let arr = []; //用来保存符合的className；
            for (let i = 0; i < nodes.length; i++) {
                if (hasClass(nodes[i], className)) arr.push(nodes[i]);
            }
            return arr;
        }
    }

    // get block place holder
    let getHolder = (node, cache) => {
        let div = document.createElement(node.tagName);
        div.className = node.className;
        div.setAttribute(DATASET_ID, Math.random());
        div.style.height = cache.height + 'px';
        return div;
    };


    // check node visible
    let isVisible = (node, port, cache) => {
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
    let moveToMemory = (node, cache) => {
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
    let moveToPage = (holder, cache) => {
        holder.insertAdjacentElement('afterEnd', cache.source);
        cache.status = STATUS_VIEW;
        util.removeByEC(holder);
    };


    return (element, className) => {
        viewPort = element,
            nodeMap = {};

        element.addEventListener("scroll", () => {
            let list = !className ?
                element.children || element.childNodes :
                util.getByClassName(className);

            let port = {
                top: viewPort.scrollTop,
                height: viewPort.clientHeight
            };

            Array.prototype.slice.call(list).forEach((it) => {
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
        }, false);
    }

})()
