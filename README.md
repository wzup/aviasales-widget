# aviasales-widget
A date-range picker widget for Travelpayouts company of Aviasales OTA 

![Demo Screenshot](https://github.com/wzup/aviasales-widget/tree/master/src/img/screenshot.png "Logo Title Text 1")

(Link for the initial assignment https://github.com/KosyanMedia/Front-end_TP_test)

## How do I run the widget?

Execute following commands in your terminal

1. `git clone https://github.com/wzup/aviasales-widget.git`
2. `cd aviasales-widget`
3. `npm install`
4. `npm start`
5. Visit http://localhost:3000/ in your browser

## How does it work?

Evething is already pre-installed and set up in this demo. 

To see html set up, open [/views/index.html](https://github.com/wzup/aviasales-widget/blob/master/views/index.html)

To see widget's code, open [/src/js/Widget.js](https://github.com/wzup/aviasales-widget/blob/master/src/js/Widget.js)

To see Webpack configuration, open [/webpack/development.browser.js](https://github.com/wzup/aviasales-widget/blob/master/webpack/development.browser.js)


The widget is run as any other widget out there - you import widget's CSS styles and JavaScript code on your page. Initialize it and run it. 

However, below is a detailed explanation.

#### If you want to add the widget on your own site, follow these steps

1. Import widget's CSS styles on a page right before closing `</head>` tag.
```
<head>
    ... your stuff ...
    <link rel="stylesheet" href="//localhost:3000/css/sa_widget.css">
</head>
```
2. Import widget's JavaScript SDK code. Right below opening `<body>` tag.
```
<body>
    <script src="//localhost:3000/js/sdk.js" type="application/javascript" charset="utf-8"></script>
```
3. Initialize the widget.

- `AS` means "Aviasales". It is a namespace for widget's properties and methods. A namespace is used to avoid polluting global `window` scope.
- `init` is a method to initialize and run the widget.
```
let params = { bg_color: 'red' };
AS.init(params);
```
- `id` is an arbitrary id attribute of any block node you want your widget be inserted to.
```
<section id="sa-widget">
    ... widget will be inserted into this "section" node
</section>
```
- Since this is a demo widget, only these three options are used to modify widget's look:

  `button_color` - a background color for "SEARCH" button of the widget; dafault is `#f5a523`.
  
  `bg_color` - a background color of the widget itself; dafault is `#498fe1`.
  
  `font_color` - a text color for any text inside the widget; dafault is `#fff`.

So, to modify widget's look, uncomment these three options and provide desired colors, like shown below.


```
<script type="application/javascript" charset="utf-8">
    AS.init({
        appId: '12345',
        id: 'as_widget',
        locale: 'en',
        version: 'v1.0',
        
        // button_color: 'red',
        // bg_color: 'aqua',
        // font_color: 'green'
    });
</script>
```

That's all. 

All requred tasks have been implemented:

1. The widget is **responsive**. Min width == 200px, max width == 1024px;

2. All three requred features have been utilized - `webpack`, `PostCSS` и `SVG`.

3. Date pickers have been added to date picker fields.

4. Customization of colors have been implemented.