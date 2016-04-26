import React from 'react';
import ReactDom from 'react-dom';
import RestrauntMenuCategories from "./src/componnents/RestrauntMenuCategories.jsx";

var categories = [ "ALL", "APPETIZERS", "BREAKFAST", "PASTA", "SPECIALS", "DESERT" ]


ReactDom.render(<RestrauntMenuCategories data={categories}/>, document.getElementById('menu'));
