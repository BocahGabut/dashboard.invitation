'use strict';
!function() {
 function load(i) {
   if (document.getElementById("header-lang-img")) {
     if ("en" == i) {
       document.getElementById("header-lang-img").src = "assets/images/flags/us.svg";
     } else {
       if ("sp" == i) {
         document.getElementById("header-lang-img").src = "assets/images/flags/spain.svg";
       } else {
         if ("gr" == i) {
           document.getElementById("header-lang-img").src = "assets/images/flags/germany.svg";
         } else {
           if ("it" == i) {
             document.getElementById("header-lang-img").src = "assets/images/flags/italy.svg";
           } else {
             if ("ru" == i) {
               document.getElementById("header-lang-img").src = "assets/images/flags/russia.svg";
             } else {
               if ("ch" == i) {
                 document.getElementById("header-lang-img").src = "assets/images/flags/china.svg";
               } else {
                 if ("fr" == i) {
                   document.getElementById("header-lang-img").src = "assets/images/flags/french.svg";
                 }
               }
             }
           }
         }
       }
     }
     localStorage.setItem("language", i);
     result = localStorage.getItem("language");
     (function() {
       if (null == result) {
         load(current);
       }
       var requestForData = new XMLHttpRequest;
       requestForData.open("GET", "assets/lang/" + result + ".json");
       requestForData.onreadystatechange = function() {
         var data;
         if (4 === this.readyState && 200 === this.status) {
           data = JSON.parse(this.responseText);
           Object.keys(data).forEach(function(index) {
             var fixedElms = document.querySelectorAll("[data-key='" + index + "']");
             Array.from(fixedElms).forEach(function(param) {
               param.textContent = data[index];
             });
           });
         }
       };
       requestForData.send();
     })();
   }
 }
 function activateTimestamps() {
   var fixedElms;
   if (document.querySelectorAll(".navbar-nav .collapse")) {
     fixedElms = document.querySelectorAll(".navbar-nav .collapse");
     Array.from(fixedElms).forEach(function(node) {
       var beforeAfterEvent = new bootstrap.Collapse(node, {
         toggle : false
       });
       node.addEventListener("show.bs.collapse", function(event) {
         event.stopPropagation();
         var fixedElms;
         event = node.parentElement.closest(".collapse");
         if (event) {
           fixedElms = event.querySelectorAll(".collapse");
           Array.from(fixedElms).forEach(function(player) {
             player = bootstrap.Collapse.getInstance(player);
             if (player !== beforeAfterEvent) {
               player.hide();
             }
           });
         } else {
           fixedElms = function(e) {
             var hash_settings = [];
             var i = e.parentNode.firstChild;
             for (; i;) {
               if (1 === i.nodeType && i !== e) {
                 hash_settings.push(i);
               }
               i = i.nextSibling;
             }
             return hash_settings;
           }(node.parentElement);
           Array.from(fixedElms).forEach(function(e) {
             if (2 < e.childNodes.length) {
               e.firstElementChild.setAttribute("aria-expanded", "false");
             }
             e = e.querySelectorAll("*[id]");
             Array.from(e).forEach(function(e) {
               e.classList.remove("show");
               if (2 < e.childNodes.length) {
                 e = e.querySelectorAll("ul li a");
                 Array.from(e).forEach(function(triggerElement) {
                   if (triggerElement.hasAttribute("aria-expanded")) {
                     triggerElement.setAttribute("aria-expanded", "false");
                   }
                 });
               }
             });
           });
         }
       });
       node.addEventListener("hide.bs.collapse", function(arg) {
         arg.stopPropagation();
         arg = node.querySelectorAll(".collapse");
         Array.from(arg).forEach(function(vpId) {
           childCollapseInstance = bootstrap.Collapse.getInstance(vpId);
           childCollapseInstance.hide();
         });
       });
     });
   }
 }
 function init() {
   var tr;
   var self;
   var layout_id = document.documentElement.getAttribute("data-layout");
   var b = sessionStorage.getItem("defaultAttribute");
   b = JSON.parse(b);
   if (!(!b || "twocolumn" != layout_id && "twocolumn" != b["data-layout"])) {
    //  document.querySelector(".navbar-menu").innerHTML = inactiveButton;
     (tr = document.createElement("ul")).innerHTML = '<a href="#" class="logo"><img src="assets/images/logo-sm.png" alt="" height="22"></a>';
     Array.from(document.getElementById("navbar-nav").querySelectorAll(".menu-link")).forEach(function(e) {
       tr.className = "twocolumn-iconview";
       var group = document.createElement("li");
       var panel = e;
       Array.from(panel.querySelectorAll("span")).forEach(function(e) {
         e.classList.add("d-none");
       });
       if (e.parentElement.classList.contains("twocolumn-item-show")) {
         e.classList.add("active");
       }
       group.appendChild(panel);
       tr.appendChild(group);
       if (panel.classList.contains("nav-link")) {
         panel.classList.replace("nav-link", "nav-icon");
       }
       panel.classList.remove("collapsed", "menu-link");
     });
     if (b = (b = "/" == location.pathname ? "index.html" : location.pathname.substring(1)).substring(b.lastIndexOf("/") + 1)) {
       if (!!(b = document.getElementById("navbar-nav").querySelector('[href="' + b + '"]'))) {
         if (self = b.closest(".collapse.menu-dropdown")) {
           self.classList.add("show");
           self.parentElement.children[0].classList.add("active");
           self.parentElement.children[0].setAttribute("aria-expanded", "true");
           if (self.parentElement.closest(".collapse.menu-dropdown")) {
             self.parentElement.closest(".collapse").classList.add("show");
             if (self.parentElement.closest(".collapse").previousElementSibling) {
               self.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
             }
             if (self.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
               self.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
               if (self.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {
                 self.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
               }
             }
           }
         }
       }
     }
    //  document.getElementById("two-column-menu").innerHTML = tr.outerHTML;
     Array.from(document.querySelector("#two-column-menu ul").querySelectorAll("li a")).forEach(function(a) {
       var tagName = (tagName = "/" == location.pathname ? "index.html" : location.pathname.substring(1)).substring(tagName.lastIndexOf("/") + 1);
       a.addEventListener("click", function(obj) {
         var children;
         if ((tagName != "/" + a.getAttribute("href") || a.getAttribute("data-bs-toggle")) && document.body.classList.contains("twocolumn-panel")) {
           document.body.classList.remove("twocolumn-panel");
         }
         document.getElementById("navbar-nav").classList.remove("twocolumn-nav-hide");
         document.querySelector(".hamburger-icon").classList.remove("open");
         if (obj.target && obj.target.matches("a.nav-icon") || obj.target && obj.target.matches("i")) {
           if (null !== document.querySelector("#two-column-menu ul .nav-icon.active")) {
             document.querySelector("#two-column-menu ul .nav-icon.active").classList.remove("active");
           }
           (obj.target.matches("i") ? obj.target.closest("a") : obj.target).classList.add("active");
           if (0 < (children = document.getElementsByClassName("twocolumn-item-show")).length) {
             children[0].classList.remove("twocolumn-item-show");
           }
           obj = (obj.target.matches("i") ? obj.target.closest("a") : obj.target).getAttribute("href").slice(1);
           if (document.getElementById(obj)) {
             document.getElementById(obj).parentElement.classList.add("twocolumn-item-show");
           }
         }
       });
       if (!(tagName != "/" + a.getAttribute("href") || a.getAttribute("data-bs-toggle"))) {
         a.classList.add("active");
         document.getElementById("navbar-nav").classList.add("twocolumn-nav-hide");
         if (document.querySelector(".hamburger-icon")) {
           document.querySelector(".hamburger-icon").classList.add("open");
         }
       }
     });
     if ("horizontal" !== document.documentElement.getAttribute("data-layout")) {
       if (self = new SimpleBar(document.getElementById("navbar-nav"))) {
         self.getContentElement();
       }
       if (self = new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0])) {
         self.getContentElement();
       }
     }
   }
 }
 function f(parent) {
   if (parent) {
     var top = parent.offsetTop;
     var left = parent.offsetLeft;
     var width = parent.offsetWidth;
     var fullHeight = parent.offsetHeight;
     if (parent.offsetParent) {
       for (; parent.offsetParent;) {
         top = top + (parent = parent.offsetParent).offsetTop;
         left = left + parent.offsetLeft;
       }
     }
     return top >= window.pageYOffset && left >= window.pageXOffset && top + fullHeight <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth;
   }
 }
//  function draw() {
//    if ("vertical" == document.documentElement.getAttribute("data-layout")) {
//     //  document.getElementById("two-column-menu").innerHTML = "";
//     //  document.querySelector(".navbar-menu").innerHTML = inactiveButton;
//     //  document.getElementById("scrollbar").setAttribute("data-simplebar", "");
//     //  document.getElementById("navbar-nav").setAttribute("data-simplebar", "");
//      document.getElementById("scrollbar").classList.add("h-100");
//    }
//    if ("twocolumn" == document.documentElement.getAttribute("data-layout")) {
//      document.getElementById("scrollbar").removeAttribute("data-simplebar");
//      document.getElementById("scrollbar").classList.remove("h-100");
//    }
//    if ("horizontal" == document.documentElement.getAttribute("data-layout")) {
//      reset();
//    }
//  }
 function refresh() {
   feather.replace();
   var a = document.documentElement.clientWidth;
   if (a < 1025 && 767 < a) {
     document.body.classList.remove("twocolumn-panel");
     if ("twocolumn" == sessionStorage.getItem("data-layout")) {
       document.documentElement.setAttribute("data-layout", "twocolumn");
       if (document.getElementById("customizer-layout03")) {
         document.getElementById("customizer-layout03").click();
       }
       init();
       replace();
       activateTimestamps();
     }
     if ("vertical" == sessionStorage.getItem("data-layout")) {
       document.documentElement.setAttribute("data-sidebar-size", "sm");
     }
    //  if (document.querySelector(".hamburger-icon")) {
    //    document.querySelector(".hamburger-icon").classList.add("open");
    //  }
   } else {
     if (1025 <= a) {
       document.body.classList.remove("twocolumn-panel");
       if ("twocolumn" == sessionStorage.getItem("data-layout")) {
         document.documentElement.setAttribute("data-layout", "twocolumn");
         if (document.getElementById("customizer-layout03")) {
           document.getElementById("customizer-layout03").click();
         }
         init();
         replace();
         activateTimestamps();
       }
       if ("vertical" == sessionStorage.getItem("data-layout")) {
         document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
       }
       if (document.querySelector(".hamburger-icon")) {
         document.querySelector(".hamburger-icon").classList.remove("open");
       }
     } else {
       if (a <= 767) {
         document.body.classList.remove("vertical-sidebar-enable");
         document.body.classList.add("twocolumn-panel");
         if ("twocolumn" == sessionStorage.getItem("data-layout")) {
           document.documentElement.setAttribute("data-layout", "vertical");
          //  show("vertical");
           activateTimestamps();
         }
         if ("horizontal" != sessionStorage.getItem("data-layout")) {
           document.documentElement.setAttribute("data-sidebar-size", "lg");
         }
        //  if (document.querySelector(".hamburger-icon")) {
        //    document.querySelector(".hamburger-icon").classList.add("open");
        //  }
       }
     }
   }
   a = document.querySelectorAll("#navbar-nav > li.nav-item");
   Array.from(a).forEach(function(e) {
     e.addEventListener("click", drop.bind(this), false);
     e.addEventListener("mouseover", drop.bind(this), false);
   });
 }
 function drop(event) {
   if (event.target && event.target.matches("a.nav-link span")) {
     if (0 == f(event.target.parentElement.nextElementSibling)) {
       event.target.parentElement.nextElementSibling.classList.add("dropdown-custom-right");
       event.target.parentElement.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
       var section = event.target.parentElement.nextElementSibling;
       Array.from(section.querySelectorAll(".menu-dropdown")).forEach(function(e) {
         e.classList.add("dropdown-custom-right");
       });
     } else {
       if (1 == f(event.target.parentElement.nextElementSibling) && 1848 <= window.innerWidth) {
         var playbackSpeedClasses = document.getElementsByClassName("dropdown-custom-right");
         for (; 0 < playbackSpeedClasses.length;) {
           playbackSpeedClasses[0].classList.remove("dropdown-custom-right");
         }
       }
     }
   }
   if (event.target && event.target.matches("a.nav-link")) {
     if (0 == f(event.target.nextElementSibling)) {
       event.target.nextElementSibling.classList.add("dropdown-custom-right");
       event.target.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
       section = event.target.nextElementSibling;
       Array.from(section.querySelectorAll(".menu-dropdown")).forEach(function(e) {
         e.classList.add("dropdown-custom-right");
       });
     } else {
       if (1 == f(event.target.nextElementSibling) && 1848 <= window.innerWidth) {
         playbackSpeedClasses = document.getElementsByClassName("dropdown-custom-right");
         for (; 0 < playbackSpeedClasses.length;) {
           playbackSpeedClasses[0].classList.remove("dropdown-custom-right");
         }
       }
     }
   }
 }
 function update() {
   var targetWidth = document.documentElement.clientWidth;
   if (767 < targetWidth) {
     document.querySelector(".hamburger-icon").classList.toggle("open");
   }
   if ("horizontal" === document.documentElement.getAttribute("data-layout")) {
     if (document.body.classList.contains("menu")) {
       document.body.classList.remove("menu");
     } else {
       document.body.classList.add("menu");
     }
   }
   if ("vertical" === document.documentElement.getAttribute("data-layout")) {
     if (targetWidth < 1025 && 767 < targetWidth) {
       document.body.classList.remove("vertical-sidebar-enable");
       if ("sm" == document.documentElement.getAttribute("data-sidebar-size")) {
         document.documentElement.setAttribute("data-sidebar-size", "");
       } else {
         document.documentElement.setAttribute("data-sidebar-size", "sm");
       }
     } else {
       if (1025 < targetWidth) {
         document.body.classList.remove("vertical-sidebar-enable");
         if ("lg" == document.documentElement.getAttribute("data-sidebar-size")) {
           document.documentElement.setAttribute("data-sidebar-size", "sm");
         } else {
           document.documentElement.setAttribute("data-sidebar-size", "lg");
         }
       } else {
         if (targetWidth <= 767) {
           document.body.classList.add("vertical-sidebar-enable");
           document.documentElement.setAttribute("data-sidebar-size", "lg");
         }
       }
     }
   }
   if ("twocolumn" == document.documentElement.getAttribute("data-layout")) {
     if (document.body.classList.contains("twocolumn-panel")) {
       document.body.classList.remove("twocolumn-panel");
     } else {
       document.body.classList.add("twocolumn-panel");
     }
   }
 }
 function link() {
   document.addEventListener("DOMContentLoaded", function() {
     var fixedElms = document.getElementsByClassName("code-switcher");
     Array.from(fixedElms).forEach(function(a) {
       a.addEventListener("change", function() {
         var _popOverContent = a.closest(".card");
         var prettyPrintButton = _popOverContent.querySelector(".live-preview");
         _popOverContent = _popOverContent.querySelector(".code-view");
         if (a.checked) {
           prettyPrintButton.classList.add("d-none");
           _popOverContent.classList.remove("d-none");
         } else {
           prettyPrintButton.classList.remove("d-none");
           _popOverContent.classList.add("d-none");
         }
       });
     });
     feather.replace();
   });
   window.addEventListener("resize", refresh);
   refresh();
   Waves.init();
   document.addEventListener("scroll", function() {
     var prettyPrintButton;
     if (prettyPrintButton = document.getElementById("page-topbar")) {
       if (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop) {
         prettyPrintButton.classList.add("topbar-shadow");
       } else {
         prettyPrintButton.classList.remove("topbar-shadow");
       }
     }
   });
   window.addEventListener("load", function() {
     var fixedElms;
     ("twocolumn" == document.documentElement.getAttribute("data-layout") ? replace : click)();
     if (fixedElms = document.getElementsByClassName("vertical-overlay")) {
       Array.from(fixedElms).forEach(function(e) {
         e.addEventListener("click", function() {
           document.body.classList.remove("vertical-sidebar-enable");
           if ("twocolumn" == sessionStorage.getItem("data-layout")) {
             document.body.classList.add("twocolumn-panel");
           } else {
             document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
           }
         });
       });
     }
     bind();
   });
   if (document.getElementById("topnav-hamburger-icon")) {
     document.getElementById("topnav-hamburger-icon").addEventListener("click", update);
   }
   var returnValue = sessionStorage.getItem("defaultAttribute");
   var returnType = JSON.parse(returnValue);
   returnValue = document.documentElement.clientWidth;
   if ("twocolumn" == returnType["data-layout"] && returnValue < 767) {
     Array.from(document.getElementById("two-column-menu").querySelectorAll("li")).forEach(function(e) {
       e.addEventListener("click", function(canCreateDiscussions) {
         document.body.classList.remove("twocolumn-panel");
       });
     });
   }
 }
 function replace() {
   feather.replace();
   var t;
   var e;
   var a = "/" == location.pathname ? "index.html" : location.pathname.substring(1);
   if (a = a.substring(a.lastIndexOf("/") + 1)) {
     if ("twocolumn-panel" == document.body.className) {
       document.getElementById("two-column-menu").querySelector('[href="' + a + '"]').classList.add("active");
     }
     if (t = document.getElementById("navbar-nav").querySelector('[href="' + a + '"]')) {
       t.classList.add("active");
       e = (e = t.closest(".collapse.menu-dropdown")) && e.parentElement.closest(".collapse.menu-dropdown") ? (e.classList.add("show"), e.parentElement.children[0].classList.add("active"), e.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show"), e.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown") && (a = e.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").getAttribute("id"),
       e.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show"), e.parentElement.closest(".collapse.menu-dropdown").parentElement.classList.remove("twocolumn-item-show"), document.getElementById("two-column-menu").querySelector('[href="#' + a + '"]') && document.getElementById("two-column-menu").querySelector('[href="#' + a + '"]').classList.add("active")), e.parentElement.closest(".collapse.menu-dropdown").getAttribute("id")) :
       (t.closest(".collapse.menu-dropdown").parentElement.classList.add("twocolumn-item-show"), e.getAttribute("id"));
       if (document.getElementById("two-column-menu").querySelector('[href="#' + e + '"]')) {
         document.getElementById("two-column-menu").querySelector('[href="#' + e + '"]').classList.add("active");
       }
     } else {
       document.body.classList.add("twocolumn-panel");
     }
   }
 }
 function click() {
   var t = "/" == location.pathname ? "index.html" : location.pathname.substring(1);
   if (!!(t = t.substring(t.lastIndexOf("/") + 1))) {
     if (t = document.getElementById("navbar-nav").querySelector('[href="' + t + '"]')) {
       t.classList.add("active");
       if (t = t.closest(".collapse.menu-dropdown")) {
         t.classList.add("show");
         t.parentElement.children[0].classList.add("active");
         t.parentElement.children[0].setAttribute("aria-expanded", "true");
         if (t.parentElement.closest(".collapse.menu-dropdown")) {
           t.parentElement.closest(".collapse").classList.add("show");
           if (t.parentElement.closest(".collapse").previousElementSibling) {
             t.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
           }
           if (t.parentElement.parentElement.parentElement.parentElement.closest(".collapse.menu-dropdown")) {
             t.parentElement.parentElement.parentElement.parentElement.closest(".collapse").classList.add("show");
             if (t.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling) {
               console.log("parentCollapseDiv", t);
               t.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
               if ("horizontal" == document.documentElement.getAttribute("data-layout") && t.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse")) {
                 t.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
               }
             }
           }
         }
       }
     }
   }
 }
 function f(parent) {
   if (parent) {
     var top = parent.offsetTop;
     var left = parent.offsetLeft;
     var width = parent.offsetWidth;
     var fullHeight = parent.offsetHeight;
     if (parent.offsetParent) {
       for (; parent.offsetParent;) {
         top = top + (parent = parent.offsetParent).offsetTop;
         left = left + parent.offsetLeft;
       }
     }
     return top >= window.pageYOffset && left >= window.pageXOffset && top + fullHeight <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth;
   }
 }
 function remove() {
   var fixedElms = document.querySelectorAll(".counter-value");
   if (fixedElms) {
     Array.from(fixedElms).forEach(function(el) {
       !function onSuccess() {
         var cc = +el.getAttribute("data-target");
         var i = +el.innerText;
         var resolution = cc / 250;
         if (resolution < 1) {
           resolution = 1;
         }
         if (i < cc) {
           el.innerText = (i + resolution).toFixed(0);
           setTimeout(onSuccess, 1);
         } else {
           el.innerText = cc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
         }
         el.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }();
     });
   }
 }
 function reset() {
   document.getElementById("two-column-menu").innerHTML = "";
  //  document.querySelector(".navbar-menu").innerHTML = inactiveButton;
   document.getElementById("scrollbar").removeAttribute("data-simplebar");
   document.getElementById("navbar-nav").removeAttribute("data-simplebar");
   document.getElementById("scrollbar").classList.remove("h-100");
   var a = firstOccurrenceIdx;
   var slides = document.querySelectorAll("ul.navbar-nav > li.nav-item");
   var result = "";
   var img = "";
   Array.from(slides).forEach(function(elem, currentSlide) {
     if (currentSlide + 1 === a) {
       img = elem;
     }
     if (a < currentSlide + 1) {
       result = result + elem.outerHTML;
       elem.remove();
     }
     if (currentSlide + 1 === slides.length && img.insertAdjacentHTML) {
       img.insertAdjacentHTML("afterend", '<li class="nav-item">\t\t\t\t\t\t<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\t\t\t\t\t\t\t<i class="ri-briefcase-2-line"></i> More\t\t\t\t\t\t</a>\t\t\t\t\t\t<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' + result + "</ul></div>\t\t\t\t\t</li>");
     }
   });
 }
 function show(name) {
   if ("vertical" == name) {
     document.getElementById("two-column-menu").innerHTML = "";
    //  document.querySelector(".navbar-menu").innerHTML = inactiveButton;
     if (document.getElementById("theme-settings-offcanvas")) {
       document.getElementById("sidebar-size").style.display = "block";
       document.getElementById("sidebar-view").style.display = "block";
       document.getElementById("sidebar-color").style.display = "block";
       document.getElementById("sidebar-img").style.display = "block";
       document.getElementById("layout-position").style.display = "block";
       document.getElementById("layout-width").style.display = "block";
     }
    //  draw();
     click();
     bind();
     updateUI();
   } else {
     if ("horizontal" == name) {
       reset();
       if (document.getElementById("theme-settings-offcanvas")) {
         document.getElementById("sidebar-size").style.display = "none";
         document.getElementById("sidebar-view").style.display = "none";
         document.getElementById("sidebar-color").style.display = "none";
         document.getElementById("sidebar-img").style.display = "none";
         document.getElementById("layout-position").style.display = "block";
         document.getElementById("layout-width").style.display = "block";
       }
       click();
     } else {
       if ("twocolumn" == name) {
         document.getElementById("scrollbar").removeAttribute("data-simplebar");
         document.getElementById("scrollbar").classList.remove("h-100");
         if (document.getElementById("theme-settings-offcanvas")) {
           document.getElementById("sidebar-size").style.display = "none";
           document.getElementById("sidebar-view").style.display = "none";
           document.getElementById("sidebar-color").style.display = "block";
           document.getElementById("sidebar-img").style.display = "block";
           document.getElementById("layout-position").style.display = "none";
           document.getElementById("layout-width").style.display = "none";
         }
       }
     }
   }
 }
 function bind() {
   document.getElementById("vertical-hover").addEventListener("click", function() {
     if ("sm-hover" === document.documentElement.getAttribute("data-sidebar-size")) {
       document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active");
     } else {
       document.documentElement.getAttribute("data-sidebar-size");
       document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
     }
   });
 }
 function render(name) {
   if (name == name) {
     switch(name["data-layout"]) {
       case "vertical":
         callback("data-layout", "vertical");
         sessionStorage.setItem("data-layout", "vertical");
         document.documentElement.setAttribute("data-layout", "vertical");
        //  show("vertical");
         activateTimestamps();
         break;
       case "horizontal":
         callback("data-layout", "horizontal");
         sessionStorage.setItem("data-layout", "horizontal");
         document.documentElement.setAttribute("data-layout", "horizontal");
         show("horizontal");
         break;
       case "twocolumn":
         callback("data-layout", "twocolumn");
         sessionStorage.setItem("data-layout", "twocolumn");
         document.documentElement.setAttribute("data-layout", "twocolumn");
         show("twocolumn");
         break;
       default:
         if ("vertical" == sessionStorage.getItem("data-layout") && sessionStorage.getItem("data-layout")) {
           callback("data-layout", "vertical");
           sessionStorage.setItem("data-layout", "vertical");
           document.documentElement.setAttribute("data-layout", "vertical");
          //  show("vertical");
           activateTimestamps();
         } else {
           if ("horizontal" == sessionStorage.getItem("data-layout")) {
             callback("data-layout", "horizontal");
             sessionStorage.setItem("data-layout", "horizontal");
             document.documentElement.setAttribute("data-layout", "horizontal");
             show("horizontal");
           } else {
             if ("twocolumn" == sessionStorage.getItem("data-layout")) {
               callback("data-layout", "twocolumn");
               sessionStorage.setItem("data-layout", "twocolumn");
               document.documentElement.setAttribute("data-layout", "twocolumn");
               show("twocolumn");
             }
           }
         }
     }
     switch(name["data-topbar"]) {
       case "light":
         callback("data-topbar", "light");
         sessionStorage.setItem("data-topbar", "light");
         document.documentElement.setAttribute("data-topbar", "light");
         break;
       case "dark":
         callback("data-topbar", "dark");
         sessionStorage.setItem("data-topbar", "dark");
         document.documentElement.setAttribute("data-topbar", "dark");
         break;
       default:
         if ("dark" == sessionStorage.getItem("data-topbar")) {
           callback("data-topbar", "dark");
           sessionStorage.setItem("data-topbar", "dark");
           document.documentElement.setAttribute("data-topbar", "dark");
         } else {
           callback("data-topbar", "light");
           sessionStorage.setItem("data-topbar", "light");
           document.documentElement.setAttribute("data-topbar", "light");
         }
     }
     switch(name["data-layout-style"]) {
       case "default":
         callback("data-layout-style", "default");
         sessionStorage.setItem("data-layout-style", "default");
         document.documentElement.setAttribute("data-layout-style", "default");
         break;
       case "detached":
         callback("data-layout-style", "detached");
         sessionStorage.setItem("data-layout-style", "detached");
         document.documentElement.setAttribute("data-layout-style", "detached");
         break;
       default:
         if ("detached" == sessionStorage.getItem("data-layout-style")) {
           callback("data-layout-style", "detached");
           sessionStorage.setItem("data-layout-style", "detached");
           document.documentElement.setAttribute("data-layout-style", "detached");
         } else {
           callback("data-layout-style", "default");
           sessionStorage.setItem("data-layout-style", "default");
           document.documentElement.setAttribute("data-layout-style", "default");
         }
     }
     switch(name["data-sidebar-size"]) {
       case "lg":
         callback("data-sidebar-size", "lg");
         document.documentElement.setAttribute("data-sidebar-size", "lg");
         sessionStorage.setItem("data-sidebar-size", "lg");
         break;
       case "sm":
         callback("data-sidebar-size", "sm");
         document.documentElement.setAttribute("data-sidebar-size", "sm");
         sessionStorage.setItem("data-sidebar-size", "sm");
         break;
       case "md":
         callback("data-sidebar-size", "md");
         document.documentElement.setAttribute("data-sidebar-size", "md");
         sessionStorage.setItem("data-sidebar-size", "md");
         break;
       case "sm-hover":
         callback("data-sidebar-size", "sm-hover");
         document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
         sessionStorage.setItem("data-sidebar-size", "sm-hover");
         break;
       default:
         if ("sm" == sessionStorage.getItem("data-sidebar-size")) {
           document.documentElement.setAttribute("data-sidebar-size", "sm");
           callback("data-sidebar-size", "sm");
           sessionStorage.setItem("data-sidebar-size", "sm");
         } else {
           if ("md" == sessionStorage.getItem("data-sidebar-size")) {
             document.documentElement.setAttribute("data-sidebar-size", "md");
             callback("data-sidebar-size", "md");
             sessionStorage.setItem("data-sidebar-size", "md");
           } else {
             if ("sm-hover" == sessionStorage.getItem("data-sidebar-size")) {
               document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
               callback("data-sidebar-size", "sm-hover");
               sessionStorage.setItem("data-sidebar-size", "sm-hover");
             } else {
               document.documentElement.setAttribute("data-sidebar-size", "lg");
               callback("data-sidebar-size", "lg");
               sessionStorage.setItem("data-sidebar-size", "lg");
             }
           }
         }
     }
     switch(name["data-layout-mode"]) {
       case "light":
         callback("data-layout-mode", "light");
         document.documentElement.setAttribute("data-layout-mode", "light");
         sessionStorage.setItem("data-layout-mode", "light");
         break;
       case "dark":
         callback("data-layout-mode", "dark");
         document.documentElement.setAttribute("data-layout-mode", "dark");
         sessionStorage.setItem("data-layout-mode", "dark");
         break;
       default:
         if (sessionStorage.getItem("data-layout-mode") && "dark" == sessionStorage.getItem("data-layout-mode")) {
           sessionStorage.setItem("data-layout-mode", "dark");
           document.documentElement.setAttribute("data-layout-mode", "dark");
           callback("data-layout-mode", "dark");
         } else {
           sessionStorage.setItem("data-layout-mode", "light");
           document.documentElement.setAttribute("data-layout-mode", "light");
           callback("data-layout-mode", "light");
         }
     }
     switch(name["data-layout-width"]) {
       case "fluid":
         callback("data-layout-width", "fluid");
         document.documentElement.setAttribute("data-layout-width", "fluid");
         sessionStorage.setItem("data-layout-width", "fluid");
         break;
       case "boxed":
         callback("data-layout-width", "boxed");
         document.documentElement.setAttribute("data-layout-width", "boxed");
         sessionStorage.setItem("data-layout-width", "boxed");
         break;
       default:
         if ("boxed" == sessionStorage.getItem("data-layout-width")) {
           sessionStorage.setItem("data-layout-width", "boxed");
           document.documentElement.setAttribute("data-layout-width", "boxed");
           callback("data-layout-width", "boxed");
         } else {
           sessionStorage.setItem("data-layout-width", "fluid");
           document.documentElement.setAttribute("data-layout-width", "fluid");
           callback("data-layout-width", "fluid");
         }
     }
     switch(name["data-sidebar"]) {
       case "light":
         callback("data-sidebar", "light");
         sessionStorage.setItem("data-sidebar", "light");
         document.documentElement.setAttribute("data-sidebar", "light");
         break;
       case "dark":
         callback("data-sidebar", "dark");
         sessionStorage.setItem("data-sidebar", "dark");
         document.documentElement.setAttribute("data-sidebar", "dark");
         break;
       case "gradient":
         callback("data-sidebar", "gradient");
         sessionStorage.setItem("data-sidebar", "gradient");
         document.documentElement.setAttribute("data-sidebar", "gradient");
         break;
       case "gradient-2":
         callback("data-sidebar", "gradient-2");
         sessionStorage.setItem("data-sidebar", "gradient-2");
         document.documentElement.setAttribute("data-sidebar", "gradient-2");
         break;
       case "gradient-3":
         callback("data-sidebar", "gradient-3");
         sessionStorage.setItem("data-sidebar", "gradient-3");
         document.documentElement.setAttribute("data-sidebar", "gradient-3");
         break;
       case "gradient-4":
         callback("data-sidebar", "gradient-4");
         sessionStorage.setItem("data-sidebar", "gradient-4");
         document.documentElement.setAttribute("data-sidebar", "gradient-4");
         break;
       default:
         if (sessionStorage.getItem("data-sidebar") && "light" == sessionStorage.getItem("data-sidebar")) {
           sessionStorage.setItem("data-sidebar", "light");
           callback("data-sidebar", "light");
           document.documentElement.setAttribute("data-sidebar", "light");
         } else {
           if ("dark" == sessionStorage.getItem("data-sidebar")) {
             sessionStorage.setItem("data-sidebar", "dark");
             callback("data-sidebar", "dark");
             document.documentElement.setAttribute("data-sidebar", "dark");
           } else {
             if ("gradient" == sessionStorage.getItem("data-sidebar")) {
               sessionStorage.setItem("data-sidebar", "gradient");
               callback("data-sidebar", "gradient");
               document.documentElement.setAttribute("data-sidebar", "gradient");
             } else {
               if ("gradient-2" == sessionStorage.getItem("data-sidebar")) {
                 sessionStorage.setItem("data-sidebar", "gradient-2");
                 callback("data-sidebar", "gradient-2");
                 document.documentElement.setAttribute("data-sidebar", "gradient-2");
               } else {
                 if ("gradient-3" == sessionStorage.getItem("data-sidebar")) {
                   sessionStorage.setItem("data-sidebar", "gradient-3");
                   callback("data-sidebar", "gradient-3");
                   document.documentElement.setAttribute("data-sidebar", "gradient-3");
                 } else {
                   if ("gradient-4" == sessionStorage.getItem("data-sidebar")) {
                     sessionStorage.setItem("data-sidebar", "gradient-4");
                     callback("data-sidebar", "gradient-4");
                     document.documentElement.setAttribute("data-sidebar", "gradient-4");
                   }
                 }
               }
             }
           }
         }
     }
     switch(name["data-sidebar-image"]) {
       case "none":
         callback("data-sidebar-image", "none");
         sessionStorage.setItem("data-sidebar-image", "none");
         document.documentElement.setAttribute("data-sidebar-image", "none");
         break;
       case "img-1":
         callback("data-sidebar-image", "img-1");
         sessionStorage.setItem("data-sidebar-image", "img-1");
         document.documentElement.setAttribute("data-sidebar-image", "img-1");
         break;
       case "img-2":
         callback("data-sidebar-image", "img-2");
         sessionStorage.setItem("data-sidebar-image", "img-2");
         document.documentElement.setAttribute("data-sidebar-image", "img-2");
         break;
       case "img-3":
         callback("data-sidebar-image", "img-3");
         sessionStorage.setItem("data-sidebar-image", "img-3");
         document.documentElement.setAttribute("data-sidebar-image", "img-3");
         break;
       case "img-4":
         callback("data-sidebar-image", "img-4");
         sessionStorage.setItem("data-sidebar-image", "img-4");
         document.documentElement.setAttribute("data-sidebar-image", "img-4");
         break;
       default:
         if (sessionStorage.getItem("data-sidebar-image") && "none" == sessionStorage.getItem("data-sidebar-image")) {
           sessionStorage.setItem("data-sidebar-image", "none");
           callback("data-sidebar-image", "none");
           document.documentElement.setAttribute("data-sidebar-image", "none");
         } else {
           if ("img-1" == sessionStorage.getItem("data-sidebar-image")) {
             sessionStorage.setItem("data-sidebar-image", "img-1");
             callback("data-sidebar-image", "img-1");
             document.documentElement.setAttribute("data-sidebar-image", "img-2");
           } else {
             if ("img-2" == sessionStorage.getItem("data-sidebar-image")) {
               sessionStorage.setItem("data-sidebar-image", "img-2");
               callback("data-sidebar-image", "img-2");
               document.documentElement.setAttribute("data-sidebar-image", "img-2");
             } else {
               if ("img-3" == sessionStorage.getItem("data-sidebar-image")) {
                 sessionStorage.setItem("data-sidebar-image", "img-3");
                 callback("data-sidebar-image", "img-3");
                 document.documentElement.setAttribute("data-sidebar-image", "img-3");
               } else {
                 if ("img-4" == sessionStorage.getItem("data-sidebar-image")) {
                   sessionStorage.setItem("data-sidebar-image", "img-4");
                   callback("data-sidebar-image", "img-4");
                   document.documentElement.setAttribute("data-sidebar-image", "img-4");
                 }
               }
             }
           }
         }
     }
     switch(name["data-layout-position"]) {
       case "fixed":
         callback("data-layout-position", "fixed");
         sessionStorage.setItem("data-layout-position", "fixed");
         document.documentElement.setAttribute("data-layout-position", "fixed");
         break;
       case "scrollable":
         callback("data-layout-position", "scrollable");
         sessionStorage.setItem("data-layout-position", "scrollable");
         document.documentElement.setAttribute("data-layout-position", "scrollable");
         break;
       default:
         if (sessionStorage.getItem("data-layout-position") && "scrollable" == sessionStorage.getItem("data-layout-position")) {
           callback("data-layout-position", "scrollable");
           sessionStorage.setItem("data-layout-position", "scrollable");
           document.documentElement.setAttribute("data-layout-position", "scrollable");
         } else {
           callback("data-layout-position", "fixed");
           sessionStorage.setItem("data-layout-position", "fixed");
           document.documentElement.setAttribute("data-layout-position", "fixed");
         }
     }
   }
 }
 function updateUI() {
   setTimeout(function() {
     var triangleOffset;
     var t;
     var triangle = document.getElementById("navbar-nav");
     if (triangle) {
       triangle = triangle.querySelector(".nav-item .active");
       if (300 < (triangleOffset = triangle ? triangle.offsetTop : 0) && (t = document.getElementsByClassName("app-menu") ? document.getElementsByClassName("app-menu")[0] : "") && t.querySelector(".simplebar-content-wrapper")) {
         setTimeout(function() {
           t.querySelector(".simplebar-content-wrapper").scrollTop = 330 == triangleOffset ? triangleOffset + 85 : triangleOffset;
         }, 0);
       }
     }
   }, 250);
 }
 function callback(key, name) {
   Array.from(document.querySelectorAll("input[name=" + key + "]")).forEach(function(event) {
     if (name == event.value) {
       event.checked = true;
     } else {
       event.checked = false;
     }
     event.addEventListener("change", function() {
       document.documentElement.setAttribute(key, event.value);
       sessionStorage.setItem(key, event.value);
       if ("data-layout-width" == key && "boxed" == event.value) {
         document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
         sessionStorage.setItem("data-sidebar-size", "sm-hover");
         document.getElementById("sidebar-size-small-hover").checked = true;
       } else {
         if ("data-layout-width" == key && "fluid" == event.value) {
           document.documentElement.setAttribute("data-sidebar-size", "lg");
           sessionStorage.setItem("data-sidebar-size", "lg");
           document.getElementById("sidebar-size-default").checked = true;
         }
       }
       if ("data-layout" == key) {
         if ("vertical" == event.value) {
          //  show("vertical");
           activateTimestamps();
           feather.replace();
         } else {
           if ("horizontal" == event.value) {
             document.getElementById("sidebarimg-none").click();
             show("horizontal");
             feather.replace();
           } else {
             if ("twocolumn" == event.value) {
               show("twocolumn");
               document.documentElement.setAttribute("data-layout-width", "fluid");
               document.getElementById("layout-width-fluid").click();
               init();
               replace();
               activateTimestamps();
               feather.replace();
             }
           }
         }
       }
     });
   });
   Array.from(document.querySelectorAll("#collapseBgGradient .form-check input")).forEach(function(radioItem) {
     var title = document.getElementById("collapseBgGradient");
     if (1 == radioItem.checked) {
       (new bootstrap.Collapse(title, {
         toggle : false
       })).show();
     }
     document.querySelector("[data-bs-target='#collapseBgGradient']").addEventListener("click", function(canCreateDiscussions) {
       document.getElementById("sidebar-color-gradient").click();
     });
   });
   Array.from(document.querySelectorAll("[name='data-sidebar']")).forEach(function(e) {
     if (document.querySelector("#collapseBgGradient .form-check input:checked")) {
       document.querySelector("[data-bs-target='#collapseBgGradient']").classList.add("active");
     } else {
       document.querySelector("[data-bs-target='#collapseBgGradient']").classList.remove("active");
     }
     e.addEventListener("change", function() {
       if (document.querySelector("#collapseBgGradient .form-check input:checked")) {
         document.querySelector("[data-bs-target='#collapseBgGradient']").classList.add("active");
       } else {
         document.querySelector("[data-bs-target='#collapseBgGradient']").classList.remove("active");
       }
     });
   });
 }
 function fn(e, x, a, f) {
   var _ref_a = document.getElementById(a);
   f.setAttribute(e, x);
   if (_ref_a) {
     document.getElementById(a).click();
   }
 }
 function initialize() {
   if (!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)) {
     document.body.classList.remove("fullscreen-enable");
   }
 }
 function refreshSections() {
   var tax_value = 0;
   Array.from(document.getElementsByClassName("cart-item-price")).forEach(function(e) {
     tax_value = tax_value + parseFloat(e.innerHTML);
   });
   if (document.getElementById("cart-item-total")) {
     document.getElementById("cart-item-total").innerHTML = "$" + tax_value.toFixed(2);
   }
 }
 function check() {
   var authorSection;
   if ("horizontal" !== document.documentElement.getAttribute("data-layout")) {
     if (!!document.getElementById("navbar-nav")) {
       if (authorSection = new SimpleBar(document.getElementById("navbar-nav"))) {
         authorSection.getContentElement();
       }
     }
     if (!!document.getElementsByClassName("twocolumn-iconview")[0]) {
       if (authorSection = new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0])) {
         authorSection.getContentElement();
       }
     }
     clearTimeout(timer);
   }
 }
 var object;
 var n;
 var prettyPrintButton;
 var xupdateStatus;
 var obj;
 var ui;
 var e;
 var l;
 var i;
 var list;
 var timer;
//  var inactiveButton = document.querySelector(".navbar-menu").innerHTML;
 var firstOccurrenceIdx = 7;
 var current = "en";
 var result = localStorage.getItem("language");
 if (sessionStorage.getItem("defaultAttribute")) {
   (object = {})["data-layout"] = sessionStorage.getItem("data-layout");
   object["data-sidebar-size"] = sessionStorage.getItem("data-sidebar-size");
   object["data-layout-mode"] = sessionStorage.getItem("data-layout-mode");
   object["data-layout-width"] = sessionStorage.getItem("data-layout-width");
   object["data-sidebar"] = sessionStorage.getItem("data-sidebar");
   object["data-layout-position"] = sessionStorage.getItem("data-layout-position");
   object["data-layout-style"] = sessionStorage.getItem("data-layout-style");
   object["data-topbar"] = sessionStorage.getItem("data-topbar");
   render(object);
 } else {
   list = document.documentElement.attributes;
   object = {};
   Array.from(list).forEach(function(value) {
     var key;
     if (value && value.nodeName && "undefined" != value.nodeName) {
       key = value.nodeName;
       object[key] = value.nodeValue;
       sessionStorage.setItem(key, value.nodeValue);
     }
   });
   sessionStorage.setItem("defaultAttribute", JSON.stringify(object));
   render(object);
   if (list = document.querySelector('.btn[data-bs-target="#theme-settings-offcanvas"]')) {
     list.click();
   }
 }
 init();
 n = document.getElementById("search-close-options");
 prettyPrintButton = document.getElementById("search-dropdown");
 if (xupdateStatus = document.getElementById("search-options")) {
   xupdateStatus.addEventListener("focus", function() {
     if (0 < xupdateStatus.value.length) {
       prettyPrintButton.classList.add("show");
       n.classList.remove("d-none");
     } else {
       prettyPrintButton.classList.remove("show");
       n.classList.add("d-none");
     }
   });
   xupdateStatus.addEventListener("keyup", function(canCreateDiscussions) {
     var id;
     var fixedElms;
     if (0 < xupdateStatus.value.length) {
       prettyPrintButton.classList.add("show");
       n.classList.remove("d-none");
       id = xupdateStatus.value.toLowerCase();
       fixedElms = document.getElementsByClassName("notify-item");
       Array.from(fixedElms).forEach(function(e) {
         var activeSlots = e.getElementsByTagName("span") ? e.getElementsByTagName("span")[0].innerText.toLowerCase() : "";
         if (activeSlots) {
           e.style.display = activeSlots.includes(id) ? "block" : "none";
         }
       });
     } else {
       prettyPrintButton.classList.remove("show");
       n.classList.add("d-none");
     }
   });
   n.addEventListener("click", function() {
     xupdateStatus.value = "";
     prettyPrintButton.classList.remove("show");
     n.classList.add("d-none");
   });
   document.body.addEventListener("click", function(mutation) {
     if ("search-options" !== mutation.target.getAttribute("id")) {
       prettyPrintButton.classList.remove("show");
       n.classList.add("d-none");
     }
   });
 }
 obj = document.getElementById("search-close-options");
 ui = document.getElementById("search-dropdown-reponsive");
 e = document.getElementById("search-options-reponsive");
 if (obj && ui && e) {
   e.addEventListener("focus", function() {
     if (0 < e.value.length) {
       ui.classList.add("show");
       obj.classList.remove("d-none");
     } else {
       ui.classList.remove("show");
       obj.classList.add("d-none");
     }
   });
   e.addEventListener("keyup", function() {
     if (0 < e.value.length) {
       ui.classList.add("show");
       obj.classList.remove("d-none");
     } else {
       ui.classList.remove("show");
       obj.classList.add("d-none");
     }
   });
   obj.addEventListener("click", function() {
     e.value = "";
     ui.classList.remove("show");
     obj.classList.add("d-none");
   });
   document.body.addEventListener("click", function(mutation) {
     if ("search-options" !== mutation.target.getAttribute("id")) {
       ui.classList.remove("show");
       obj.classList.add("d-none");
     }
   });
 }
 if (list = document.querySelector('[data-toggle="fullscreen"]')) {
   list.addEventListener("click", function(event) {
     event.preventDefault();
     document.body.classList.toggle("fullscreen-enable");
     if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement) {
       if (document.cancelFullScreen) {
         document.cancelFullScreen();
       } else {
         if (document.mozCancelFullScreen) {
           document.mozCancelFullScreen();
         } else {
           if (document.webkitCancelFullScreen) {
             document.webkitCancelFullScreen();
           }
         }
       }
     } else {
       if (document.documentElement.requestFullscreen) {
         document.documentElement.requestFullscreen();
       } else {
         if (document.documentElement.mozRequestFullScreen) {
           document.documentElement.mozRequestFullScreen();
         } else {
           if (document.documentElement.webkitRequestFullscreen) {
             document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
           }
         }
       }
     }
   });
 }
 document.addEventListener("fullscreenchange", initialize);
 document.addEventListener("webkitfullscreenchange", initialize);
 document.addEventListener("mozfullscreenchange", initialize);
 l = document.getElementsByTagName("HTML")[0];
 if ((list = document.querySelectorAll(".light-dark-mode")) && list.length) {
   list[0].addEventListener("click", function(canCreateDiscussions) {
     if (l.hasAttribute("data-layout-mode") && "dark" == l.getAttribute("data-layout-mode")) {
       fn("data-layout-mode", "light", "layout-mode-light", l);
     } else {
       fn("data-layout-mode", "dark", "layout-mode-dark", l);
     }
   });
 }
 link();
 remove();
//  draw();
 if (document.getElementsByClassName("dropdown-item-cart")) {
   i = document.querySelectorAll(".dropdown-item-cart").length;
   Array.from(document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")).forEach(function(e) {
     e.addEventListener("click", function(canCreateDiscussions) {
       i--;
       this.closest(".dropdown-item-cart").remove();
       Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function(e) {
         e.innerHTML = i;
       });
       refreshSections();
       if (document.getElementById("empty-cart")) {
         document.getElementById("empty-cart").style.display = 0 == i ? "block" : "none";
       }
       if (document.getElementById("checkout-elem")) {
         document.getElementById("checkout-elem").style.display = 0 == i ? "none" : "block";
       }
     });
   });
   Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function(e) {
     e.innerHTML = i;
   });
   if (document.getElementById("empty-cart")) {
     document.getElementById("empty-cart").style.display = "none";
   }
   if (document.getElementById("checkout-elem")) {
     document.getElementById("checkout-elem").style.display = "block";
   }
   refreshSections();
 }
 if (document.getElementsByClassName("notification-check")) {
   Array.from(document.querySelectorAll(".notification-check input")).forEach(function(e) {
     e.addEventListener("click", function(event) {
       event.target.closest(".notification-item").classList.toggle("active");
     });
   });
 }
 [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(data) {
   return new bootstrap.Tooltip(data);
 });
 [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(title) {
   return new bootstrap.Popover(title);
 });
 if (document.getElementById("reset-layout")) {
   document.getElementById("reset-layout").addEventListener("click", function() {
     sessionStorage.clear();
     window.location.reload();
   });
 }
 list = document.querySelectorAll("[data-toast]");
 Array.from(list).forEach(function(B) {
   B.addEventListener("click", function() {
     var options = {};
     var m = B.attributes;
     if (m["data-toast-text"]) {
       options.text = m["data-toast-text"].value.toString();
     }
     if (m["data-toast-gravity"]) {
       options.gravity = m["data-toast-gravity"].value.toString();
     }
     if (m["data-toast-position"]) {
       options.position = m["data-toast-position"].value.toString();
     }
     if (m["data-toast-className"]) {
       options.className = m["data-toast-className"].value.toString();
     }
     if (m["data-toast-duration"]) {
       options.duration = m["data-toast-duration"].value.toString();
     }
     if (m["data-toast-close"]) {
       options.close = m["data-toast-close"].value.toString();
     }
     if (m["data-toast-style"]) {
       options.style = m["data-toast-style"].value.toString();
     }
     if (m["data-toast-offset"]) {
       options.offset = m["data-toast-offset"];
     }
     Toastify({
       newWindow : true,
       text : options.text,
       gravity : options.gravity,
       position : options.position,
       className : "bg-" + options.className,
       stopOnFocus : true,
       offset : {
         x : options.offset ? 50 : 0,
         y : options.offset ? 10 : 0
       },
       duration : options.duration,
       close : "close" == options.close,
       style : "style" == options.style ? {
         background : "linear-gradient(to right, #0AB39C, #405189)"
       } : ""
     }).showToast();
   });
 });
 list = document.querySelectorAll("[data-choices]");
 Array.from(list).forEach(function(el) {
   var self = {};
   var attributes = el.attributes;
   if (attributes["data-choices-groups"]) {
     self.placeholderValue = "This is a placeholder set in the config";
   }
   if (attributes["data-choices-search-false"]) {
     self.searchEnabled = false;
   }
   if (attributes["data-choices-search-true"]) {
     self.searchEnabled = true;
   }
   if (attributes["data-choices-removeItem"]) {
     self.removeItemButton = true;
   }
   if (attributes["data-choices-sorting-false"]) {
     self.shouldSort = false;
   }
   if (attributes["data-choices-sorting-true"]) {
     self.shouldSort = true;
   }
   if (attributes["data-choices-multiple-remove"]) {
     self.removeItemButton = true;
   }
   if (attributes["data-choices-limit"]) {
     self.maxItemCount = attributes["data-choices-limit"].value.toString();
   }
   if (attributes["data-choices-limit"]) {
     self.maxItemCount = attributes["data-choices-limit"].value.toString();
   }
   if (attributes["data-choices-editItem-true"]) {
     self.maxItemCount = true;
   }
   if (attributes["data-choices-editItem-false"]) {
     self.maxItemCount = false;
   }
   if (attributes["data-choices-text-unique-true"]) {
     self.duplicateItemsAllowed = false;
   }
   if (attributes["data-choices-text-disabled-true"]) {
     self.addItems = false;
   }
   if (attributes["data-choices-text-disabled-true"]) {
     (new Choices(el, self)).disable();
   } else {
     new Choices(el, self);
   }
 });
 list = document.querySelectorAll("[data-provider]");
 Array.from(list).forEach(function(node) {
   var attributes;
   var options;
   var scope;
   if ("flatpickr" == node.getAttribute("data-provider")) {
     scope = {};
     if ((attributes = node.attributes)["data-date-format"]) {
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-enable-time"]) {
       scope.enableTime = true;
       scope.dateFormat = attributes["data-date-format"].value.toString() + " H:i";
     }
     if (attributes["data-altFormat"]) {
       scope.altInput = true;
       scope.altFormat = attributes["data-altFormat"].value.toString();
     }
     if (attributes["data-minDate"]) {
       scope.minDate = attributes["data-minDate"].value.toString();
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-maxDate"]) {
       scope.maxDate = attributes["data-maxDate"].value.toString();
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-deafult-date"]) {
       scope.defaultDate = attributes["data-deafult-date"].value.toString();
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-multiple-date"]) {
       scope.mode = "multiple";
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-range-date"]) {
       scope.mode = "range";
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-inline-date"]) {
       scope.inline = true;
       scope.defaultDate = attributes["data-deafult-date"].value.toString();
       scope.dateFormat = attributes["data-date-format"].value.toString();
     }
     if (attributes["data-disable-date"]) {
       (options = []).push(attributes["data-disable-date"].value);
       scope.disable = options.toString().split(",");
     }
     flatpickr(node, scope);
   } else {
     if ("timepickr" == node.getAttribute("data-provider")) {
       options = {};
       if ((scope = node.attributes)["data-time-basic"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.dateFormat = "H:i";
       }
       if (scope["data-time-hrs"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.dateFormat = "H:i";
         options.time_24hr = true;
       }
       if (scope["data-min-time"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.dateFormat = "H:i";
         options.minTime = scope["data-min-time"].value.toString();
       }
       if (scope["data-max-time"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.dateFormat = "H:i";
         options.minTime = scope["data-max-time"].value.toString();
       }
       if (scope["data-default-time"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.dateFormat = "H:i";
         options.defaultDate = scope["data-default-time"].value.toString();
       }
       if (scope["data-time-inline"]) {
         options.enableTime = true;
         options.noCalendar = true;
         options.defaultDate = scope["data-time-inline"].value.toString();
         options.inline = true;
       }
       flatpickr(node, options);
     }
   }
 });
 Array.from(document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]')).forEach(function(e) {
   e.addEventListener("click", function(event) {
     event.stopPropagation();
     bootstrap.Tab.getInstance(event.target).show();
   });
 });
 (function() {
   load(null === result ? current : result);
   var text = document.getElementsByClassName("language");
   if (text) {
     Array.from(text).forEach(function(elem) {
       elem.addEventListener("click", function(canCreateDiscussions) {
         load(elem.getAttribute("data-lang"));
       });
     });
   }
 })();
 activateTimestamps();
 updateUI();
 window.addEventListener("resize", function() {
   if (timer) {
     clearTimeout(timer);
   }
   timer = setTimeout(check, 2e3);
 });
}();
// var mybutton = document.getElementById("back-to-top");
// function scrollFunction() {
//  if (100 < document.body.scrollTop || 100 < document.documentElement.scrollTop) {
//    mybutton.style.display = "block";
//  } else {
//    mybutton.style.display = "none";
//  }
// }
function topFunction() {
 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;
}
// window.onscroll = function() {
//  scrollFunction();
// };