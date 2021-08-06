javascript: (() => {
    console.log("Instructable Cleaner++ v2021.08.05 by Andrew L. Ayers");
    
    var removal_ni = document.createNodeIterator(
        document.documentElement, 
        NodeFilter.SHOW_ELEMENT, 
        {
            acceptNode(node) {

                let class_value = node.className || false;

                let position_value = document.defaultView.
                    getComputedStyle(node, null).
                    getPropertyValue("position") || false;

                return (
                    /site-header|header-actions/.test(class_value) ||
                    /videoset-wrapper|step-toolbar/.test(class_value) ||
                    /contest-entries|imadeits/.test(class_value) ||
                    /recommendations|comment-type-selector/.test(class_value) ||
                    /comment-btn|footer/.test(class_value) ||
                    /sticky|fixed/.test(position_value)
                ) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        }
    );

    var node = document.getElementsByClassName("header-meta")[0];
    node.style.float = "none";

    Array.prototype.every.call(document.getElementsByClassName("photoset-showmore"), node => { node.click(); return true; });
    Array.prototype.every.call(document.getElementsByClassName("js-show-replies"), node => { node.click(); return true; });

    while (currentNode = removal_ni.nextNode()) {
        currentNode.remove();
    };
})();