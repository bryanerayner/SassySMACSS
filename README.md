Sassy SMACSS
==========

Sassy SMACSS is a collection of simple SASS mixins designed to assist in SMACSS style projects. Common modules (like layout and cross browser mixins) are included.

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
		.nav_item
	}

	As opposed to:

	ul.nav_container
	{
		li
	}

These conventions make it easier to select module names separately from module modes. They also enforce the SMACSS concept of Depth of Applicability; We don't want to restrict the HTML of projects.

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

	@mixin change_module_name(){
		.module_name 
		{ @content; }
	}

	@mixin change_module_name__sub_item(){
		.module_name 
		{
			> .sub_item 
			{ @content; }
		}
	}

	@mixin change_module_name-butAwesome(){
		.module_name.module_name-butAwesome
		{ @content; }
	}

	@mixin change_module_name-butAwesome__sub_item(){
		.module_name.module_name-butAwesome
		{
			> .sub_item
			{ @content;}
		}
	}

Note that a double underscore denotes the interior position of the element. Hyphens, like usual, denote the mode. Each mixin should leave just a @content; rule as it's body, to allow a greater ease of access.

## Compilation

Simply grunt everything all together, and test modules before submitting a pull request. In the future it would be nice to see about automating these tests.
