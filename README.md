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


## Compilation

To compile this project, please use sourcemaps and the sass-media_query_combiner gem. 

https://github.com/aaronjensen/sass-media_query_combiner

To use this gem, include this flag when compiling SASS on the command line:

	sass --watch -r sass-media_query_combiner

