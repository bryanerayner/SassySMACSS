(function($){

	root = this;

	var Sassy = root.Sassy || {};


	/**
	 * @method collapsibleInit
	 * @param  {zepto|jQuery} $el The selection to target for initializing collapsible on.
	 */
	function naviconInit($el)
	{
		$el.on("click", function()
		{
			toggleOpen($(this));
		});
	}

	/**
	 * @method toggleOpen
	 * @description Toggle the class 'is-open' elements of the passed in parameter.
	 * @param  {zepto|jQuery} $el The elements to toggle the class on.
	 */
	function toggleOpen($el)
	{
		$el.toggleClass("is-open");
	}


	/**
	 * @method navicon
	 *  
	 * @param {zepto} [$el] The element to initialize navicon on.
	 */
	Sassy.navicon = function($el, isHamburger)
	{
		var naviconName = (isHamburger) ? "hamburger" : "navicon";
		if ($el)
		{
			naviconInit($el);
		}
		else
		{

			naviconInit($("."+naviconName));
		}
	}

	/**
	 * @method hamburger
	 *  
	 * @param {zepto} [$el] The element to initialize hamburger on.
	 */
	Sassy.hamburger = function($el)
	{
		Sassy.navicon($el, true);
	}

	root.Sassy = Sassy;
}).call(this, $ || jQuery  || zepto);