


const isRoot = (element) => {
    return element == document.body ||
        element == document.documentElement;
}

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
    }
}
