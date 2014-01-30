App = Ember.Application.create({
    LOG_TRANSITIONS: true
});


App.Router.map(function () {
    this.resource('posts', { path: '/posts'}, function () {
        this.resource('post', { path: ':post_id' });
        this.route('new');
    });

});


App.IndexRoute = Ember.Route.extend({
    redirect: function () {
        this.transitionTo('posts');
    }
});


App.PostsRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.find('post');
    }
});


App.PostsNewRoute = Ember.Route.extend({
    model: function (params) {
        return this.store.createRecord('post', {
            title: '',
            body: ''
        });
    }
});


App.PostRoute = Ember.Route.extend({
    model: function (params) {
        return  this.store.find('post', params.post_id);
    },

    setupController: function (controller, post) {
        this.controllerFor('comments').set('model', this.store.find('comment'));
        this._super(controller, post);
    }
});


// Controllers
// Ember won't generate the controller in this case.
App.CommentsController = Ember.ArrayController.extend({

});


App.PostController = Ember.ObjectController.extend({
  // initial value
  showingComments: false,

  actions: {
    showComments: function() {
      this.set('showingComments', true);
    },
    hideComments: function() {
      this.set('showingComments', false);
    }
  }
});


// Models
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Post = DS.Model.extend({
    title: DS.attr(),
    body: DS.attr(),
    comments: DS.hasMany('comment', {async: true})
});


App.Comment = DS.Model.extend({
    text: DS.attr(),
    post: DS.belongsTo('post', {async: true})
});


App.Post.FIXTURES = [
    {
        id: 1,
        title: "blog title 1",
        body: "This is blog post 1.",
        comments: [1, 2]
    },
    {
        id: 2,
        title: "blog title 2",
        body: "This is blog post 2.",
        comments: [3, 4]
    }
];

App.Comment.FIXTURES = [
    {
        id: 1,
        text: "Comment 1.",
//        post: 1
    },
    {
        id: 2,
        text: "Comment 2.",
//        post: 1
    },
    {
        id: 3,
        text: "Comment 3.",
//        post: 2
    },
    {
        id: 4,
        text: "Comment 4.",
//        post: 2
    }
];