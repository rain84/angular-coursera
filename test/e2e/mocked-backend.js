/**
 * Created by Rain Summers on 24.12.2015.
 *
 * You can ask me on 'into.the.rainy.sky@gmail.com'
 * if you have any questions about this code.
 *
 */



exports.httpBackendMock = function () {
	angular.module( 'httpBackendMock', ['confusionApp', 'ngMockE2E'] )
		.run( function ( $httpBackend ) {
			console.log( 'Test platform bootstrapping' );


			var dishes = {
				"id"          : 0,
				"name"        : "Uthapizza",
				"image"       : "images/uthapizza.png",
				"category"    : "mains",
				"label"       : "Hot",
				"price"       : 4.99,
				"description" : "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
				"comments"    : [
					{
						"rating"  : 5,
						"comment" : "Imagine all the eatables, living in conFusion!",
						"author"  : "John Lemon",
						"date"    : "2012-10-16T17:57:28.556094Z"
					},
					{
						"rating"  : 5,
						"comment" : "Imagine all the eatables, living in conFusion!",
						"author"  : "John Lemon",
						"date"    : "2012-10-16T17:57:28.556094Z"
					},
				]
			};

			$httpBackend.whenGET( 'http://localhost:3000/dishes/0' )
				.respond( dishes )
			;

			$httpBackend.whenPUT( 'http://localhost:3000/dishes/0' )
				.respond( function ( method, url, data ) {
					dishes = angular.fromJson( data );
				} )
			;


			$httpBackend.whenGET( /.*!/ ).passThrough();
			$httpBackend.whenPOST( /.*!/ ).passThrough();


			console.log( 'Test platform bootstrapping ... done' );
		} );
};
