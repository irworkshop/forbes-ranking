/****
Dirt simple Backbone app to handle 10 very rich people.
****/

/***
Templates are imported in using Jammit.
window.JST
  - row: row templale
  - sidebar: sidebar template
  - table: contains rows
***/

// models

var Person = Backbone.Model.extend({

    defaults: {
        forbes_rank: "",
        total_donations: "", 
        gift: "", 
        title: "", 
        notes: "", 
        source: "", 
        donor_rank: "", 
        net_worth: "", 
        name: "",
        image_url: "",
    },

    initialize: function(attributes, options) {
        this.view = new TableRow({ model: this });
        if (!attributes.image_url) {
            this.set('image_url', 'http://placehold.it/145x191&text=' + attributes.name);
        }
        return this;
    }
});

// collections

var PersonList = Backbone.Collection.extend({

    model: Person,

    url: "data/forbes.json"

});

// views

var TableRow = Backbone.View.extend({

    tagName: "tr",
    className: "person",

    events: {
        // event selector : callback
        "hover" : "showSidebar"
    },

    initialize: function(options) {
        _.bindAll(this);
        this.app = options.app;
        if (this.model) {
            this.render();
        }
        return this;
    },

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(JST.row(data));
        return this;
    },

    showSidebar: function(e) {
        this.app.sidebar.render(this.model);
    }
});

var TableList = Backbone.View.extend({

    initialize: function(options) {
        _.bindAll(this);
        this.app = options.app;
        this.collection = new PersonList();
        this.collection.on('reset', this.reset);
    },

    render: function() {
        var $el = this.$el;
        this.collection.each(function(person, i) {
            $el.append(person.view.el);
        });
    },

    reset: function(collection, options) {
        // attach app to each view
        var app = this.app;
        collection.each(function(model) {
            model.view.app = app;
        });

        // render once everything's in place
        this.render();

        // and we're done
        return this;
    }
});

var Sidebar = Backbone.View.extend({

    initialize: function() {

        return this;
    },

    render: function(person) {
        this.$el.html(JST.sidebar(person.toJSON()));
        return this;
    }
});

/***
Wrap everything up in a single view. This is all that will get exported.
***/
var Forbes = Backbone.View.extend({

    initialize: function(options) {
        // first, render the container elements
        this.render();

        // attach sub-views to the table and sidebar, rendered above
        // pass a reference to this app to sub-views
        this.table = new TableList({ 
            el: this.$el.find('table.forbes-ranking-table'),
            app: this
        });

        this.sidebar = new Sidebar({ el: this.$el.find('.forbes-people-sidebar') });

        // fetch data for people
        this.table.collection.fetch({
            success: function(models) {
                console.log("We've got people!");
            }
        });

        // good to go
        return this;
    },

    render: function() {
        this.$el.html(JST.table());
    }
});