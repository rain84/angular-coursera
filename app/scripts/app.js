/**
 * Created by Rain Summers on 25.11.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */

angular.module( 'confusionApp', [] )
	.controller( 'menuController', function () {
		var ctrl = this;

		ctrl.select     = select;
		ctrl.isSelected = isSelected;

		ctrl.types    = ['all', 'mains', 'appetizer', 'dessert'];
		ctrl.dishes = [
			{
				name        : 'Uthapizza',
				image : 'images/uthapizza.png',
				category : 'mains',
				label    : 'Hot',
				price    : '4.99',
				description : 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
				comment     : ''
			},
			{
				name        : 'Zucchipakoda',
				image : 'images/zucchipakoda.png',
				category : 'appetizer',
				label    : '',
				price    : '1.99',
				description : 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
				comment     : ''
			},
			{
				name        : 'Vadonut',
				image : 'images/vadonut.png',
				category : 'appetizer',
				label    : 'New',
				price    : '1.99',
				description : 'A quintessential ConFusion experience, is it a vada or is it a donut?',
				comment     : ''
			},
			{
				name        : 'ElaiCheese Cake',
				image : 'images/elaicheesecake.png',
				category : 'dessert',
				label    : '',
				price    : '2.99',
				description : 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
				comment     : ''
			}
		];
		ctrl.selector = 0;

		Object.defineProperty( ctrl, "typesFilter", {
			get : function () { return ctrl.selector && ctrl.types[ctrl.selector] || ''; }
		} );

		function select( selector ) {
			ctrl.selector = selector;
		}

		function isSelected( selector ) {
			return (ctrl.selector === selector);
		}
	} )

	.controller( 'dishDetailController', function () {
		var
			ctrl = this,

			dish = {
				name        : 'Uthapizza',
				image : 'images/uthapizza.png',
				category : 'mains',
				label    : 'Hot',
				price    : '4.99',
				description : 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
				comments    : [
					{
						rating  : 5,
						comment : "Imagine all the eatables, living in conFusion!",
						author  : "John Lemon",
						date    : "2012-10-16T17:57:28.556094Z"
					},
					{
						rating  : 4,
						comment : "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
						author  : "Paul McVites",
						date    : "2014-09-05T17:57:28.556094Z"
					},
					{
						rating  : 3,
						comment : "Eat it, just eat it!",
						author  : "Michael Jaikishan",
						date    : "2015-02-13T17:57:28.556094Z"
					},
					{
						rating  : 4,
						comment : "Ultimate, Reaching for the stars!",
						author  : "Ringo Starry",
						date    : "2013-12-02T17:57:28.556094Z"
					},
					{
						rating  : 2,
						comment : "It's your birthday, we're gonna party!",
						author  : "25 Cent",
						date    : "2011-12-02T17:57:28.556094Z"
					}

				]
			};

		ctrl.dish       = dish;
		ctrl.filterType = '';
	} )
;
