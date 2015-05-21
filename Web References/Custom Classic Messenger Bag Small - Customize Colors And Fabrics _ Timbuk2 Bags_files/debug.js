var debugDW = {
	// debug initializations called from jQuery(document).ready at the end
	// of the file
	init: function() {
		// Check if SFT is active and add build info link
		var menu = undefined;
		if (document.getElementById('dw-sf-control-menu') && document.getElementById('dw-sf-control-menu').getElementsByTagName("ul")) {
			menu = document.getElementById('dw-sf-control-menu').getElementsByTagName("ul")[0];
		}
		if (menu) {
			var buildInfoLineItem = document.createElement('li');
			buildInfoLineItem.className = "x-menu-list-item";
			buildInfoLineItem.id = "buil_listitem";
			buildInfoLineItem.onmouseover = function() {this.className='x-menu-list-item x-menu-item-active'};
			buildInfoLineItem.onmouseout = function() {this.className='x-menu-list-item'};
			buildInfoLineItem.innerHTML = "<a href='#' class='x-menu-item' id='build-anchor' onclick='debugDW.showBuildInfo()'><img class='x-menu-item-icon dw-sf-control-menu-log' src='/on/demandware.static/Sites-Site/-/-/internal/images/s.gif'>Build Information</a>";
			menu.appendChild(buildInfoLineItem);
		}
	},
	showBuildInfo: function() {
		document.getElementById('build_information').style.display='block';
	}

};

// debug namespace initialization on dom ready
angular.element(document).ready(function() {
	debugDW.init();
});
