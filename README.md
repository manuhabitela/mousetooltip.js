# mousetooltip.js

A tooltip that follows your mouse. *Requires jQuery*.

## Installation

Insert the mousetooltip.js file and the few bits of CSS in your page. You can download everything via bower: `bower install mousetooltip`.

## Basic usage

You can use the tooltip in different ways. The simplest is to initialize it through JavaScript and handling tooltip content through HTML.

In your HTML content, add a `with-tooltip` class to every element you want a tooltip to appear when you put your mouse over it. On these elements (or any child of these elements), add a `data-tooltip` attribute, containing the text (or html) you want to show in the tooltip.

```js
MouseTooltip.init();
```

```html
    <!-- simplest  -->
    <p class="with-tooltip" data-tooltip="Hey! This will appear when the mouse is over me.">
        What'up.
    </p>

    <!-- works too! -->
    <p class="with-tooltip">
        What'up. <span data-tooltip="I have the content, but it will appear when the mouse is over the whole paragraph, since it has the with-tooltip class and I don't.">And stuff.</span>
    </p>
```

*Voilà*, the tooltips are set and will show and hide according to the mouse.

## Advanced usage

If that doesn't fit, you can also set different classes and attributes to use on the HTML, or totally disable HTML tooltip handling.

You can pass various options at initialization. Here is the list with default values:

```js
MouseTooltip.init({

    //use css (3d) transforms to move the tooltip. Depends on Modernizr.
    cssTransforms: false,

    //define how far (in px) the tooltip is from the mouse.
    tooltipOffset: { x: 10, y: 10 }, //10px from the left, 10px from the top

    //class used on the tooltip
    tooltipClass: 'mouse-tooltip',

    //id used on the tooltip
    tooltipId: 'mouse-tooltip',

    //callback used on `mouseover`, `click` and `mouseout` events to automatically show/hide the tooltip. Defaults to internal handler that depends and contentClass and contentAttr options. You can pass your own function, or set to `false` to disable tooltip handling via HTML
    mouseActionsHandler: MouseTooltip.onMouseAction,

    //when using a mouseActionsHandler, class used on the HTML elements we want the tooltip to appear on mouseover
    contentClass: 'with-tooltip',

    //when using a mouseActionsHandler, attribute (containing the tooltip content we want) to put on the HTML elements (or any child) we want the tooltip to appear on mouseover
    contentAttr: 'data-tooltip'

});
```

You can also directly use the JavaScript API in order to change tooltip's state and content.

`MouseTooltip.show(content)`: show the tooltip with the given content. You can give anything that `$().html()` accepts.
`MouseTooltip.content(content)`: change the tooltip content with the given one.You can give anything that `$().html()` accepts.
`MouseTooltip.hide()`: hides the tooltip.