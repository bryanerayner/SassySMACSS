(function($){

	root = this;

	var Sassy = root.Sassy || {};


	/**
	 * @method collapsibleInit
	 * @param  {zepto|jQuery} $el The selection to target for initializing collapsible on.
	 */
	function collapsibleInit($el)
	{
		var $root = $el.not(".collapsible *");

		$root.on("click", ".collapsible > .m_collapseButton", function()
		{
			collapsibleToggle($(this));
		});
		$root.on("click", ".collapsible > .m_collapsible_label", function()
		{
			collapsibleToggle($(this));
		});
	}

	/**
	 * @method collapsibleToggle
	 * @description Toggle the class 'is-collapsed' on the parent '.collapsible' elements of the passed in parameter.
	 * @param  {zepto|jQuery} $el The elements to toggle the class on.
	 */
	function collapsibleToggle($el)
	{
		$el.parent(".collapsible").toggleClass("is-collapsed");
	}


	/**
	 * @method collapsible
	 *  
	 * @param {zepto} [$el] The element to initialize collapsible on.
	 */
	Sassy.collapsible = function($el)
	{
		if ($el)
		{
			collapsibleInit($el);
		}
		else
		{
			collapsibleInit($(".collapsible"));
		}
	}

	root.Sassy = Sassy;
}).call(this, $ || jQuery  || zepto);