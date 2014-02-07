(function($){

	root = this;

	var Sassy = root.Sassy || {};


	/**
	 * @method collapsibleInit
	 * @param  {zepto} $el The element to target for initializing collapsible on.
	 */
	function collapsibleInit($el)
	{
		var $root = $el.not(".collapsible *");

		$root.on("click", ".collapsible > .m_collapseButton", function()
		{
			collapsibleToggle($(this));
		});
		$root.on("click", ".collapsible > .m_label", function()
		{
			collapsibleToggle($(this));
		});
	}

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

		}
		else
		{
			collapsibleInit($(".collapsible"));
		}
	}

	root.Sassy = Sassy;
}).call(this, $ || zepto);