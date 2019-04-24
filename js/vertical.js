$(window).load(function() {
    atMenuV.init();
    // atMenuV.toggleMenu();
});
var atMenuV = {
  getMenuIcon: function() {
    return $('div[name="menuIcon"]');
  },
  getMenuPanel: function() {
    return $('div[name="menuPanel"]');
  },
  getAllPanelsMenu: function() {
    return atMenuV.getMenuPanel().find('div.menu-item');
  },
  getAllSubmenus: function() {
    return atMenuV.getMenuPanel().find('div.subitem.hasSubMenu');
  },
  getAllPanelsNotClicked: function() {
    return atMenuV.getMenuPanel().find('div.menu-item:not(.clicked)');
  },
  getPanelByName: function(name) {
    return atMenuV.getMenuPanel().find('div.menu-item[name="'+name+'"]');
  },
  getCancel: function () {
    return $('div.logo img.cancel');
  },
  getAtCont: function () {
    return $('div.at-menu-container');
  },
  getBlank: function() {
    return atMenuV.getAtCont().find('div.blank');
  },
  closeBar: function() {
    var atc = atMenuV.getAtCont();
    var blk = atMenuV.getBlank();
    var men = atMenuV.getMenuPanel();
    blk.animate({ opacity: 0 }, 'easy');
    men.animate({ left: -420 }, 'easy');
    setTimeout(function() {
      atc.hide();
    }, 400);
  },
  toggleMenu: function() {
    var atc = atMenuV.getAtCont();
    var blk = atMenuV.getBlank();
    var men = atMenuV.getMenuPanel();
    if(atc.is(':visible')) {
      atMenuV.closeMenu();
    } else {
      atc.show();
      blk.animate({ opacity: 0.8 }, 'easy');
      men.animate({ left: 0 }, 'easy');
    }
  },
  openMenu: function(name) {
    var item = atMenuV.getPanelByName(name);
    var menu = item.find('div.menu-open');
    var subs = menu.find('div.subs');
    menu.show();
    menu.animate({height: menu.attr("hei")}, 300);
    item.addClass("clicked");
    setTimeout(function() {
      subs.animate({opacity: 1}, 300);
    }, 300);
  },
  closeMenu: function() {
    var item = atMenuV.getAllPanelsMenu();
    var menu = item.find('div.menu-open');
    var subs = menu.find('div.subs');
    subs.animate({opacity: 0}, 300);
    item.removeClass("clicked");
    setTimeout(function() {
      menu.animate({height: 0}, 300);
      setTimeout(function() {
        menu.hide();
      }, 300);
    }, 300);
  },
  init: function() {
    atMenuV.getAllPanelsMenu().each(function() {
      var menu = $(this).find('div.menu-open');
      var subs = menu.find('div.subs div.subitem');
      var calc = subs.length * 38;
      menu.attr("hei", calc);
    });
    atMenuV.getCancel().click(function() {
      atMenuV.closeBar();
    });
    atMenuV.getBlank().click(function() {
      atMenuV.closeBar();
    });
    atMenuV.getMenuIcon().click(function() {
      atMenuV.toggleMenu();
    });
    atMenuV.getAllPanelsMenu().each(function() {
      var panelMenu = $(this);
      panelMenu.find('div.menu-section').click(function() {
        var link = $(this).attr("link");
        if(link) {
          window.location = link;
        } else {
          var all = atMenuV.getAllPanelsMenu();
          var name = panelMenu.attr("name");
          var menu = atMenuV.getPanelByName(name).hasClass('clicked');
          var timeout = 0;
          if(all.hasClass('clicked')) {
            atMenuV.closeMenu();
            timeout = 700;
          }
          if(!menu) {
            setTimeout(function() {
              atMenuV.openMenu(name);
            }, timeout);
          }
        }
      });
    });
    // atMenuV.getAllSubmenus().each(function() {
      // $(this).unbind();
      // $(this).click(function() {
        // var sub = $(this).find('div.sub-submenu');
        //
        // sub.show();
      // });
    // });
  }
}