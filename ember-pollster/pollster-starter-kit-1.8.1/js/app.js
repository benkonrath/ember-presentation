App = Ember.Application.create();

/* ONE */

// Why not use sockets?

//"Polling actually makes a lot of sense in certain scenarios."
//
//- Guillermo Rauch - JavaScript Jabber 122 - 17mins 34 secs.
//
//http://devchat.tv/js-jabber/122-jsj-socket-io-with-guillermo-rauch


/* TWO */

App.Router.map(function() {
  this.resource('gitHubPulls');
  this.resource('otherRoute');
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('gitHubPulls');
  }
});

/* THREE */

App.GitHubPullsRoute = Ember.Route.extend({
  model: function() {
    var url = 'https://api.github.com/repos/emberjs/ember.js/pulls';
    return Ember.$.getJSON(url).then(function(data) {
      return data.splice(0, 3);
    });
  },
  actions: {
    invalidateModel: function() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }
});

App.GitHubPullsController = Ember.ArrayController.extend({
  actions: {
    getLatest: function() {
      Ember.Logger.log('Controller requesting route to refresh...');
      this.send('invalidateModel');
    }
  }
});

// http://emberjs.com/guides/routing/specifying-a-routes-model/#sts=Refreshing%20your%20model

/* FOUR */

//setInterval(function() {
//  CONTROLLER / ROUTE.send('invalidateModel');
//}, 5000);

/* FIVE */

App.Pollster = {
  start: function() {
    this.timer = setInterval(this.onPoll.bind(this), 5000);
  },

  stop: function() {
    clearInterval(this.timer);
  },

  onPoll: function() {
    CONTROLLER / ROUTE.send('invalidateModel');
  }
};

// http://joefiorini.com/posts/user-friendly-live-collections-in-emberjs

/* SIX */

App.Pollster = Ember.Object.extend({
  timer: undefined,
  interval: 5000,

  start: function () {
    if (this.get('timer') === undefined) {
      var interval = this.get('interval');
      this.set('timer', setInterval(this.onPoll.bind(this), interval));
    }
  },

  stop: function () {
    if (this.get('timer') !== undefined) {
      clearInterval(this.get('timer'));
      this.set('timer', undefined);
    }
  },

  onPoll: Ember.required(Function)
});

/* SEVEN */


App.GitHubPullsRoute.reopen({
  init: function() {
    this._super();

    var route = this;
    var pollster = App.Pollster.create({
      onPoll: function() {
        route.send('invalidateModel')
      }
    });

    this.set('pollster', pollster);
  },

  activate: function() {
    this.get('pollster').start();
  },

  deactivate: function() {
    this.get('pollster').stop();
  }
});



//http://socket.io/
//1. http://devchat.tv/js-jabber/122-jsj-socket-io-with-guillermo-rauch