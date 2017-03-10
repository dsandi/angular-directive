# angular-directive
Popover directive to show case isolated scope, pre link, post link and other features.

Completely re usable, just send the name of the html template that will be displayed when hovering the element.

`<div popover template="your_template">`

Example template

```
<p> Share data from parent scope: {{vm.data.message}}</p>

```