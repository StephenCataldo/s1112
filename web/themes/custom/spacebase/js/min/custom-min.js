!function($,o,e){"use strict";o.behaviors.generalFunctions={attach:function(o,e){var n=$.support.touch?"tap":"click";window.FontAwesomeConfig={searchPseudoElements:!0},$(".navbar-collapse").on("show.bs.collapse",function(){$(this).addClass("open"),$("body").addClass("nav-open"),$(".body-overlay").show()}).on("hide.bs.collapse",function(){$(this).removeClass("open"),$("body").removeClass("nav-open"),$(".body-overlay").hide()}),$(".body-overlay").on(n,function(){$(".navbar-toggle").click()}),$(".nav-link").on(n,function(o){o.stopPropagation(),$(".user-dropdown").fadeToggle(300)}),$(document).click(function(o){$(".user-dropdown").fadeOut(300)}),$(document).on("show.bs.tab",'.nav-tabs-responsive [data-toggle="tab"]',function(o){var e=$(o.target),n=e.closest(".nav-tabs-responsive"),s=e.closest("li"),a=s.closest("li.dropdown");s=a.length>0?a:s;var t=s.next(),l=s.prev(),r=function(o,e){o.find(".dropdown-menu").removeClass("pull-xs-left pull-xs-center pull-xs-right").addClass("pull-xs-"+e)};n.find(">li").removeClass("next prev"),l.addClass("prev"),t.addClass("next"),r(l,"left"),r(s,"center"),r(t,"right")})}}}(jQuery,Drupal,drupalSettings);