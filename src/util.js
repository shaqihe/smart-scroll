const isRoot = (element) => {
        return element == document.body ||
            element == document.documentElement;
    },
    hasClass = (node, className) => {
        var cNames = node.className.split(/\s+/); //根据空格来分割node里的元素；
        for (var i = 0; i < cNames.length; i++) {
            if (cNames[i] == className) return true;
        }
        return false;
    },
    fragment = document.createDocumentFragment();

export default {

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
            _border = parseInt(_p._$getStyle(_node, 'borderLeftWidth')) || 0;
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
                fragment.appendChild(_element);
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
