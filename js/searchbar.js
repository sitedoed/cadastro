$(window).load(function() {
    atSearch.init();
    // atMenuV.toggleMenu();
});
var atSearch = {
  getSearchIcon: function() {
    return $('div[name="searchIcon"]');
  },
  getSearchPanel: function() {
    return $('div[name="searchBar"]');
  },
  getSearchOpen: function() {
    return $('div[name="searchOpen"]');
  },
  getSearchBlank: function() {
    return $('div[name="searchBlank"]');
  },
  getCancel: function() {
    return atSearch.getSearchOpen().find('div.cancel');
  },
  closeBar: function() {
    var srchpanel = atSearch.getSearchPanel();
    var srchopen = atSearch.getSearchOpen();
    var srchblank = atSearch.getSearchBlank();
    srchblank.animate({ opacity: 0 }, 'easy');
    srchopen.animate({ top: -170 }, 'easy');
    setTimeout(function() {
      srchpanel.hide();
    }, 300);
  },
  toggleMenu: function() {
    var srchpanel = atSearch.getSearchPanel();
    var srchopen = atSearch.getSearchOpen();
    var srchblank = atSearch.getSearchBlank();
    if(srchpanel.is(':visible')) {
      atSearch.closeBar();
    } else {
      srchpanel.show();
      srchblank.animate({ opacity: 0.6 }, 'easy');
      srchopen.animate({ top: 0 }, 'easy');
    }
  },
  init: function() {
    atSearch.getCancel().click(function() {
      atSearch.closeBar();
    });
    atSearch.getSearchBlank().click(function() {
      atSearch.closeBar();
    });
    atSearch.getSearchIcon().click(function() {
      atSearch.toggleMenu();
    });
  }
}