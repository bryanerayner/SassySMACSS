Sassy SMACSS
==========

Sassy SMACSS is a collection of simple SASS mixins designed to assist in SMACSS style projects. Common modules (like layout and cross browser mixins) are included.


## Naming Conventions

Modules are named using underscores:

	.post_preview
	.news_story
	.blog_post
	.nav
	.l_footer
	.l_header

Individual components of modules (that are pieces of that module) are nested inside the module, and use an m_ prefix. This denotes that they are part of the module.

	.post_preview
	{
		.m_summary
		{

		}
	}

Using this convention helps determine the difference between modules.

	.post_preview
	{
		.m_summary // This is a summary that belongs to post_preview. It'll never just be out there in the wild.
		{

		}

		.module.summary // This is an actual summary module. Perhaps the post_preview module would like to take advantage of .summary's styles, but needs to make it half the width it typically is. 
		{

		}
	}

It may seem funny to have to use .module.summary, instead of just .summary in the above example. This actually helps us [defeat the dark side](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html "CSS Specificity Wars") of selector specificity, while maintaining semantics. 

Here's the battle in action, and how SassySMACSS wins:

	//HTML

	<article class="post_preview">
		<!-- This is not a stand alone module of post_preview, but a part that 
		it uses. This will prevent collisions with a potential snippet module. -->
		<span class="m_snippet">
		...
		</span>

		<!-- Here, we have an actual summary module, with the -long mode attached. We 
		use module to denote that this is actually the summary module, not a 
		component of post_preview -->
		<div class="module summary summary-long">
		 ...
		</div>
	</article>
	
	
	
	//SCSS
	
	.post_preview
	{
		// Post preview is going to include the summary module and change it's styles in order to correctly lay it out on the page.

		.module.summary
		{
			// We want to win this specificity war, and force the summary modules to have a 50% width and float to the right.

			width: 50%; float:right;
		}
	}
	
	// Summary unfortunately picked the location of the battle. It has the
	upper hand as it's lower in the cascade.
	.summary
	{
		// This attack will be unsuccesful - Normal summaries will have to listen to the 
		post_preview because of nesting.

		width: 80%; float:left;

		&.summary-long
		{
			// Because we've included the .module class inside our HTML and our SCSS, we 
			also win this specificity battle. If we hadn't have used .module, we would 
			have lost due to the cascade.
			width:100%;
		}
	}

Following these guidelines helps SassySMACSS be semantic, while winning specifity battles without resorting to *!important;*


## Contributing

This project is open to contributions. Just make sure the style matches the following conventions:

### Module names have underscores:

	.l_grid_cell

	As opposed to:

	.l-grid-cell

### Module modes use a hyphen:

	.l_grid_cell-1
	.l_grid_cell-sm
	.l_grid_cell-sm-1

	As opposed to:

	.l_grid_cell_1
	.l_grid_cell_sm
	.l_grid_cell_sm-1
	.l_grid_cell_sm_1

### Element types are not allowed - Even on nav:

	.nav_container
	{
		.nav_item {}
	}

	As opposed to:

	ul.nav_container
	{
		li {}
	}

These conventions make it easier to select module names separately from module modes. They also enforce the SMACSS concept to limit Depth of Applicability; We don't want to restrict the HTML of projects to be a certain way.

Submit a pull request if you have a useful mixin which can be simply included in a project. 

## Variables and Defaults

Many lessons for SassySMACSS have been taken unashamedly from ZURB's Foundation. One of these lessons is the use of variables for all components. In SassySMACSS, you'll find the following naming convention for variables:

	$defaults-module_name-property: someValue !default;

#### Example - Floats
It may be tempting to float things left or right. Don't. Use $defaults-float; instead. If you are developing a module that other developers may want to configure, set up a variable in this fashion:

	$defaults-module_name-float: $defaults-float !default;

This allows things like right to left conversion to be simple across the board, while permitting developers to control positioning of various modules programmatically. Use float_inverse() to get the opposite of any float value.


## Change Mixins

While it may seem like overkill, SMACSS opinions on theming are highly useful for sites with multiple faces. In an app, this is especially true. To support both theming and hotfixes, each module should include a change mixin for each component.

While frutruating to develop for new modules, it makes theme files a breeze to use. Any modules must have change mixins for each component.

### Example:

	//This great module
	.module_name
	{
		> .sub_item
		{

		}

		&.module_name-butAwesome
		{
			> .sub_item
			{

			}
		}
	}

	// Should include these mixins after the declaration of the module:

	@mixin change-module_name(){
		.module_name 
		{ @content; }
	}

	@mixin change-module_name--sub_item(){
		.module_name 
		{
			> .sub_item 
			{ @content; }
		}
	}

	@mixin change-module_name-butAwesome(){
		.module_name.module_name-butAwesome
		{ @content; }
	}

	@mixin change-module_name-butAwesome--sub_item(){
		.module_name.module_name-butAwesome
		{
			> .sub_item
			{ @content;}
		}
	}

Note that a double hyphen denotes the interior position of the element. Single hyphens, like usual, denote the mode. Each mixin should leave just a @content; rule as it's body, to allow a greater ease of access.

## Compilation

Simply grunt everything all together, and test modules before submitting a pull request. In the future it would be nice to see about automating these tests.
