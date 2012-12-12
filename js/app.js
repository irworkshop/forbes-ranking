/****
Dirt simple Backbone app to handle 10 very rich people.
****/

// templates
var templates;
jQuery(function($) {
    templates = {
        tablerow: Hogan.compile($('#row-template').html()),
        sidebar: Hogan.compile($('#sidebar-template').html())
    }
});

// models

var Person = Backbone.Model.extend({

    defaults: {
        "forbes_rank": "",
        "total_donations": "", 
        "gift": "", 
        "title": "", 
        "notes": "", 
        "source": "", 
        "donor_rank": "", 
        "networth": "", 
        "name": ""
    },

    initialize: function(attributes, options) {
        this.view = new TableRow({ model: this });
        return this;
    }
});

// collections

var PersonList = Backbone.Collection.extend({

    model: Person,

    url: "data/forbes.json",

    initialize: function(models, options) {
        this.view = new TableList({ collection: this });
        return this;
    }

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
        if (this.model) {
            this.render();
        }
        return this;
    },

    render: function() {
        var data = this.model.toJSON();
        this.$el.html(templates.tablerow.render(data));
        return this;
    },

    showSidebar: function(e) {
        sidebar.render(this.model);
    }
});

var TableList = Backbone.View.extend({

    el: "#people",

    initialize: function(options) {
        _.bindAll(this);
        this.collection.on('reset', this.render);
    },

    render: function() {
        var $el = this.$el;
        this.collection.each(function(person, i) {
            $el.append(person.view.el);
        });
    }
});

var Sidebar = Backbone.View.extend({

    el: '#sidebar',

    initialize: function() {

        return this;
    },

    render: function(person) {
        this.$el.html(templates.sidebar.render(person.toJSON()));
        return this;
    }
})

var people = new PersonList()
  , sidebar = new Sidebar();

people.fetch({
    success: function(models) {
        console.log("We've got people!");
    }
});