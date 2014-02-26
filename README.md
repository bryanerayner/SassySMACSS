Sassy SMACSS
==========

Sassy SMACSS is a collection of simple SASS mixins designed to assist in SMACSS style projects. Common modules (like layout and cross browser mixins) are included.

## Usage

Sassy SMACSS can be included via Bower.

#### Example:

    "dependencies": {
        "SassySMACSS": ">=0.0.4"
    }

The Bower plugin will provide the following directories:

	modules - Actual module files
	mixins	- Mixins available for use
	lib 	- Javascript for certain components
	css		- CSS output, for those who do not wish to recompile

SassySMACSS relies on [Autoprefixer](https://github.com/ai/autoprefixer "Autoprefixer") to handle browser prefixes. When building using SCSS files, remember to use a similar post-processor to avoid problems.


## Naming Conventions

SassySMACSS is intended to be used in conjunction with a SMACSS style project. As such, naming conventions are very different than the type used in Bootstrap or Foundation.

SMACSS is based on commonly used semantics. Common elements are grouped into *modules*. Each module can have different modes or variants, as well as sub components. Some modules can contain other modules. SMACSS doesn't promote a given naming convention, but it's understood that a naming convention is essential for each project. SassySMACSS does use a very consistent naming convention, which you may or may not choose to use in your modules.

### Modules

SassySMACSS modules are named using underscores, rather than hyphens. This really helps us when we are typing and doing text selection.

#### Module Names:

	// Good:
	.post_preview
	.news_story
	.blog_post
	.nav
	.l_footer
	.l_header

	// Bad:
	.post-preview
	.my-cool-module
	.dont-do-this


Variants for modules DO use hyphens. This enables us to quickly select the variant or the module. For single word modules, we can quickly see that there is a variant, and not a new module.

#### Module Variants:

	// Good:
	.post_preview-large
	.post_preview-featured
	.sprite-sm

	// Not so good (please don't):
	.post_preview_large
	.post-preview_featured
	.sprite_sm

### Module Components and Nested Modules

Oftentimes, the layout of a page will use nested modules. Sometimes, modules will include a couple of modules in their layouts. A great example of this are social media buttons or trend statistics.

Module components (that are pieces of that module) use an m_ prefix, and where possible, a child selector. This denotes that they are part of the module, and limits problems with depth of applicability.

#### Module Component:

	.post_preview
	{
		.m_summary
		{

		}
	}

Nested modules use .module, followed by their module name. This prevents name collisions. It also provides required firepower to win any [CSS Specificity Wars](http://www.stuffandnonsense.co.uk/archives/css_specificity_wars.html "CSS Specificity Wars").

#### Module Component and Nested Module Together:

	.post_preview
	{
		.m_summary // This is a summary that belongs to post_preview. It'll never just be out there in the wild.
		{

		}

		.module.summary // This is an actual summary module. Perhaps the post_preview module would like to take advantage of .summary's styles, but needs to make it half the width it typically is. 
		{

		}
	}


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
