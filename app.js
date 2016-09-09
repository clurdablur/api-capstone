$(document).ready(function() {
	$('.wine-region').submit(function(event) {
		$('.results').html('');
		var region = $("#region option:selected").val();
		var order = $("#order option:selected").val();
		getWineRegion(region, order);
	});
});



getWineRegion = function(region, order) {
	var url = "http://services.wine.com/api/beta/service.svc/json/catalog?apikey=6587380fed81a577ef3d6721135eb090"
	url += "&search=" + region
	url += "&sortBy=" + order
	$.getJSON(url, function(response) {
		var list = response.Products.List
		for (i = 0; i < list.length; i++) {
		wineResponse(list[i])
		};
	});	
};


getCountries = function(tag){
	var url = "https://restcountries.eu/rest/v1/all"
	$.getJSON(url, function(response){
		var list = response
		for (i=0; i < list.length; i++) {
			$('#region').append('<option value="'+list[i].name+'">'+list[i].name+'</option>')
		}
		console.log(response)
	});
};

getCountries()

wineResponse = function(item){
			var element = $('.templates .show-results').clone()
			element.removeClass('.hidden')
			element.find('.name').html(item.Name)
			$('.results').append(element)
			element.find('.price').html(item.PriceMax)
			$('.results').append(element)
			element.find('.year').html(item.Vintage)
			$('.results').append(element)
			element.find('.link').html(item.Url)
			$('.results').append(element)
			element.find('.region').html(item.Region)
			$('.results').append(element)
};