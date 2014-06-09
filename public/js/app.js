App = Ember.Application.create();

// Local In Memory Data Store (Data is lost if your refresh or close the browser)
//App.ApplicationAdapter = DS.FixtureAdapter;

// Local Storage (Persists)
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'brief-contacts'
});

App.Contact = DS.Model.extend({
  first:  DS.attr('string'),
  last:   DS.attr('string'), 
  phone:  DS.attr('string')
});

// Seed the In Memory database

/*
App.Contact.FIXTURES = [
  { id: 1, first: 'Bob', last:  'Smith', phone: '(777) 999 9999'}, 
  { id: 2, first: 'Jane', last:   'Smith', phone: '(888) 555 4444'}
]

*/

// Router
App.Router.map(function() {
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' }, function() {
      this.route('edit');
    });
    this.route('create');    
  });  
 }); 
  
/****************************************** 
  Contacts
  
*******************************************/

// Routes
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

App.ContactsCreateRoute = Ember.Route.extend({
  model: function(){
    return Ember.Object.create(); 
    
  },
  renderTemplate: function() {
   this.render('contact.edit', {
     controller: 'contactsCreate'
    
  });
  
  }
  
});

// Controllers

App.ContactController = Ember.ObjectController.extend({
  actions: {
    edit: function() {
      this.transitionToRoute('contact.edit'); 
    },
    delete: function() {
      this.get('model').deleteRecord();
      this. get('model').save();
      this.transitionToRoute('contacts');
    }
  }                                            
});

App.ContactEditController = Ember.ObjectController.extend({
  
  actions: {
   save: function() {
      var contact = this.get('model');
      contact.save();
     this.transitionToRoute('contacts');
    
   }
  }

});


App.ContactsCreateController = Ember.ObjectController.extend( {
  
  actions: {
    save: function() {
     console.log('Retrieve the values from the form');
     var first = this.get('first');  
     var last = this.get('last');
     var phone = this.get('phone');  
     var newContact = this.store.createRecord('contact',{
      first: first,
      last: last,
      phone: phone
                                        
     }                                       
    );
     
     console.log('saving ...');
     newContact.save();
    
     this.transitionToRoute('contacts');
     
    }
    
  }

});