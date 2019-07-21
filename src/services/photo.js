export default {
    bind(el, bindings, vnode) {
        el.style.backgroundImage = bindings.value;
    }
}