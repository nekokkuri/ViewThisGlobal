## Introduction
With the increasing number of Japanese moe online games, the demand for English viewers that support them also increases. Although you can play them directly from the website, viewers are usually made for convenience of the player, providing translations for the English community, timers and notifications,  and quick access even for non-English players. **Based Viewer** or **BV** solves this problem by supporting multiple popular games such as KanColle, ShiroHime and OLET.

###Installation
This extension can only be installed on Google Chrome. It might also be installed on other Chromium-based browsers, but we do not fully support them.

* [View on Chrome WebStore](#)

Once installed, it adds an icon at the top-right of your browser where you can view or add game profiles.

## Ancestors

### [KanColle Command Center (KC3)](http://kancolle.wikia.com/wiki/User_blog:Dragonjet/KanColle_Command_Center)
Made for Kantai Collection. It is the successor to KanCo! Tools, and was renamed to KC3 starting version 4 onwards. This project will not be discontinued in favor of Based Viewer.

### [ShiroHime Handler (SHH)](http://shirohime.wikia.com/wiki/User_blog:Dragonjet/Shh_Game_Viewer)
Made for ShiroHime Quest. It enables desktop gameplay and provides in-line english translations. Features of Shh will be integrated to Based Viewer.

## Features

### Region Cookies
If this is enabled, you won't need VPN/Proxy to access the game on DMM website. You just need to go there on DMM, set the language as japanese, refresh once, and its done. You can now go to the game page and play without restriction.

### Game Profiles
With game profiles, players are not restricted to saving only one API link at a time. This enables ability to open multiple accounts at a time, and/or open multiple games at a time.

### KanColle
* **Admiral's Panel**: shows you useful and important game data in a user-friendly way.
* **Timers**: For expeditions, repairs and construction, the extension will do its own countdown and notify you once it is complete. This can be turned on and off.

### ShiroHime Quest
* **Translated images**: some important buttons and UI images are cleaned and overlayed with English text, done via CSS and is safe.
* **Inline text translations**: specific HTML elements are checked if contains japanese text and replaces it with corresponding applicable English text, similar to Google Translate mechanism.
* **UA-Spoofing**: The extension automatically changes your user-agent to a mobile device so you can play directly from desktop browser
* **No Horizontal Scrollbar**: If you play directly from desktop browser, some pages have horizontal scrollbars. This is because the page is long and the vertical-scrollbar appears, which is not present for mobile devices. Because of the vertical scrollbar, the page's viewport width gets smaller, thus some of the content are covered by it, prompting the browser to also put a horizontal scrollbar.
* **Timers**: Upon visiting the home page, timers on the Shh tools tab will start and/or update. When countdown ends, the extension will alert via screen notification and/or sound, depending on settings.


## Supported Games

### [Kantai Collection](http://www.dmm.com/netgame/social/application/-/detail/=/app_id=854854/)
Kantai Collection, also known as Kancolle, is a online browser game in which one assumes the role of an admiral, assembles a fleet of kanmusu ("ship girl", girls based on World War II era Japanese ships and submarines) and battles against fleets of alien enemy warships.

### [ShiroHime Quest](http://dengekionline.com/shirohime/)
Shirohime Quest is a mobile game wherein the player assumes the role of a feudal lord, gathers as many castle girls (anthropomorphized versions of castles) and sets them off to fight a series of increasingly difficult battles for fun (and possibly profit). Shirohime Quest plays similarly to Kantai Collection with a few changes and refinements to gameplay.

### [Over Legend Endless Tower](http://www.dmm.com/netgame/feature/oletower.html)
"Over Legend Endless Tower" (Ole Tower) is a Japanese webgame developed by SE Mobile and Online Co.Ltd. The main purpose of the game is to build an "endless" tower using different "tool girls" (KenHime) at your disposal. The game also includes a combat system in a phase-by-phase and turn-based fashion.

### Other games planned
* [Shiro Collection](http://www.dmm.com/netgame_s/shirocolle)
* [Kanpani](http://www.dmm.com/netgame_s/kanpani/)

## FAQ

###Is this free? Why is it on the WebStore?
Yes it is free. Not all apps on the Chrome WebStore are paid. You can install it anytime on any desktop Chrome on any/or all your computers. We will never ask for payment, ever.

### Do I still need KC3 and/or Shh?
Not anymore. You may uninstall them if you already have Based Viewer.

## Help
Please report bugs on the [issues section](https://github.com/dragonjet/based/issues).