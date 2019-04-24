function initInfiniteScroll(scrollableArticles, articlesAndPos, lastArticle, shareButtons) {
	var win = $(window);
	var defaultSection = $('div.default-layout')[0];
	var previousDocHeight = 0;

    <!-- Update URL bar when scrolling -->
	var updateUrlBar = function () {
	  var currentScrollPos = win.scrollTop();
	  for(var i = 0; i<articlesAndPos.length; i++) {
        if(currentScrollPos >= articlesAndPos[i].pos && currentScrollPos <= (articlesAndPos[i].pos + articlesAndPos[i].height) && !(window.location.href.endsWith(articlesAndPos[i].link))) {
            window.history.replaceState( {} , 'articles', articlesAndPos[i].link );
            if (i == 0) {
              shareButtons.show(); 
            } else {
              shareButtons.hide();
            }
            break;
        }
      }
	};

	<!-- Append article(s) -->
	var appendArticles = function () {
      <!-- Append Multiple articles if they are small to keep the scroll alive -->
        var articleLink = scrollableArticles[0].relative.concat("?scroll=true");
        $.ajax({
           url: articleLink,
           success: function (data) {
            var section = $('<section><br><br></section>');
            section.addClass('article').append(data);
            $(defaultSection).append(section);
            lastArticle = section;
            articlesAndPos.push({link:scrollableArticles[0].absolute, pos:lastArticle.offset().top, height:lastArticle.height()});
            if(window) {
              window.imager.add();
            }
           scrollableArticles.splice(0,1);
           if(shouldAppend()) {
            appendArticles();
           }
          },
            cache: false
        });
	};

    <!-- Should append? -->
	var shouldAppend = function() {
      return (((lastArticle.offset().top + lastArticle.height() - (win.scrollTop() + window.innerHeight)) <= 200) && scrollableArticles.length > 0)
	}

	<!-- Each time the user scrolls -->
	win.scroll(function() {
	  var currentDocHeight = $(document).height();
      if (shouldAppend() && currentDocHeight != previousDocHeight) { <!-- The last condition is for scroll only -->
            previousDocHeight = currentDocHeight;
            appendArticles();
	  }
	  updateUrlBar();
	});

	if(shouldAppend()) {
      appendArticles();
    }
}
