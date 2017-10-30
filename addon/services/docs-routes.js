import Ember from 'ember';
import { hrefTo } from 'ember-href-to/helpers/href-to';

export default Ember.Service.extend({

  router: Ember.inject.service('-routing'),

  init() {
    this._super(...arguments);
    this.resetState();
  },

  resetState() {
    this.set('items', Ember.A());
  },

  allUrls: Ember.computed('items.[]', function() {
    return this.get('items').map(item => {
      let hrefToArgs = [ this, item.route ];
      if (item.model) {
        hrefToArgs.push(item.model);
      }

      return hrefTo.apply(null, hrefToArgs);
    });
  }),

  currentUrl: Ember.computed('router.router.currentURL', function() {
    let router = this.get('router.router');
    let currentUrl = router.get('rootURL') + router.get('currentURL');

    return currentUrl.replace("//", "/");
  }),

  previousUrl: Ember.computed('allUrls.[]', 'currentUrl', function() {
    let currentIndex = this.get('allUrls').indexOf(this.get('currentUrl'));

    if (currentIndex > 0) {
      return this.get('allUrls')[(currentIndex - 1)];
    }
  }),

  nextUrl: Ember.computed('allUrls.[]', 'currentUrl', function() {
    let currentIndex = this.get('allUrls').indexOf(this.get('currentUrl'));

    if (currentIndex < this.get('allUrls.length')) {
      return this.get('allUrls')[(currentIndex + 1)];
    }
  })

});
