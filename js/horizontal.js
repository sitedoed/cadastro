$(window).load(function() {
    atMenuH.init();
});
var atMenuH = {
  getMenu: function() {
    return $('div#menuHorizontal');
  },
  mainMenuDeps: function() {
    return atMenuH.getMenu().find('div.mainMenuDeps');
  },
  mainMenuPanels: function() {
    return atMenuH.getMenu().find('div.mainMenuPanels');
  },
  getAllButtons: function() {
    return atMenuH.mainMenuDeps().find('div.menu-item');
  },
  getAllPanels: function() {
    return atMenuH.mainMenuPanels().find('div.menu-horizontal');
  },
  getButtonByName: function(elementId) {
    return atMenuH.mainMenuDeps().find('div.menu-item[name="'+elementId+'"]');
  },
  getPanelByName: function(elementId) {
    return atMenuH.mainMenuPanels().find('div.menu-horizontal[name="'+elementId+'"]');
  },
  openMainMenu: function() {
    var mainmenu = atMenuH.mainMenuPanels();
    mainmenu.show();
    setTimeout(function() {
      mainmenu.animate({ height: 300 }, 300);
    }, 200);
  },
  closeMainMenu: function() {
    var mainmenu = atMenuH.mainMenuPanels();
    mainmenu.animate({ height: 0 }, 300);
    setTimeout(function() {
      mainmenu.hide();
    }, 300);
  },
  handleClickTags: function(elementId) {
    var menuitem = atMenuH.getButtonByName(elementId);
    var menuhorz = atMenuH.getPanelByName(elementId);
    var mainmenu = atMenuH.mainMenuPanels();
    var allpanel = atMenuH.getAllPanels();
    var allbutns = atMenuH.getAllButtons();
    if(mainmenu.is(':visible')) {
        allpanel.fadeOut("fast"); // close allpanels
        allbutns.removeClass("clicked");
        if(menuhorz.is(':visible')) {
          atMenuH.closeMainMenu(); // close main menu           
        } else {          
          setTimeout(function() {
            menuhorz.fadeIn("easy"); // open menu horzn
            menuitem.addClass("clicked");
          }, 300);
        }
      } else {
        atMenuH.openMainMenu(); // open main menu
        menuitem.addClass("clicked");
        setTimeout(function() {
          menuhorz.fadeIn("easy"); // open menu horzn
        }, 300);
      }
    },
    init: function() {
      atMenuH.getAllButtons().each(function() {
        var link = $(this).attr("link");
        if(link) {
          $(this).click(function() {
            window.location = link;
          });
        } else {
          $(this).click(function() {
            var elementId = $(this).attr("name");
            atMenuH.handleClickTags(elementId);
          });
        }
      });
    }
  }