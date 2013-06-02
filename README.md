# The Forbes Chart

tl;dr

    <div id="forbes"></div>
    <script src="path/to/forbes.js"></script>
    <script type="text/javascript">
    new Forbes({ el: '#forbes' });
    </script>

And everything gets loaded and rendered. Markup is injected into the page, so it will pick up the surrounding styles.

A style example:

    <style type="text/css">
    .forbes-ranking-table thead tr {
        background-color: orange;
    }

    .forbes-ranking-table tbody tr:hover,
    .forbes-info h2,
    .forbes-net-worth {
        color: orange;
    }
    </style>

Data gets pulled from [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0AprNP7zjIYS1dFV0SW5lMmVKcjJMcnNyc1dfYy1ySEE#gid=0), via Tabletop.js. **Any changes made will appear LIVE**.