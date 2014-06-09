App = Ember.Application.create();

// Local In Memory Data Store
// Comment this out to defualt to the RESTful Adapter
App.ApplicationAdapter = DS.FixtureAdapter;

App.Contact = DS.Model.extend({
  first:  DS.attr(),
  last:   DS.attr(), 
  phone:  DS.attr()
});

// Seed the In Memory database
App.Contact.FIXTURES = [
  { id: 1, first: 'Bob', last:  'Smith', phone: '(777) 999 9999'}, 
  { id: 2, first: 'Jane', last:   'Smith', phone: '(888) 555 4444'}
]

// Router
App.Router.map(function() {
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' }, function() {
      this.route('edit');
    });
    this.route('create');    
  }); // users 
 }); // router
  
// Contacts
App.ContactsRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('contact');
    }  
  }); 

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id); 
    
  }

});

App.ContactEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('contact');
   
  }
  
    
  });





  
 