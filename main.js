import React from 'react';
import ReactDom from 'react-dom';
import Menu from "./src/componnents/menu.jsx";

var data = [
	{
		title: "home",
		url: "home",
		children: []
	},
	{
		title: "blog",
		url: "blog",
		children: [
			{
				title: "blog1",
				url: "blog1",
				children: []
			},
			{
				title: "blog2",
				url: "blog2",
				children: [
					{
						title: "php",
						url: "php",
						children: []
					},
					{
						title: "js",
						url: "js",
						children: []
					}
				]
			}
		]
	}
]

ReactDom.render(<Menu data={data}/>, document.getElementById('menu'));
