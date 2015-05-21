

function CustomRegionUpdater(countryId, regionId, cityId, regionsData) {
  this.countryId = '#' + countryId || '#shipping_country_id';
  this.regionId = '#' + regionId || '#shipping_region_id';
  this.cityId = '#' + cityId || '#shipping_city_id';
  this.regionsData = regionsData;

  var $countriesSelect = jQuery(this.countryId);
  var $regionsSelect = jQuery(this.regionId);
  var $citiesSelect = jQuery(this.cityId);

  var self = this;

  $countriesSelect.on('change', function() {
    self.regionUpdate();
    self.rebuildSelect($regionsSelect);
  });
  $regionsSelect.on('change', function() {
    self.cityUpdate();
    self.rebuildSelect($citiesSelect);
  });

  $citiesSelect.on('change', function() {
    var $cityInput = jQuery('#shipping\\:city');
    var value = $citiesSelect.find('option:selected').text();
    $cityInput.val(value);
  });

  $countriesSelect.trigger('change');
  $regionsSelect.trigger('change');
}



CustomRegionUpdater.prototype.regionUpdate = function() {
  var $countriesSelect = jQuery(this.countryId);
  var $regionsSelect = jQuery(this.regionId);
  var countryVal = $countriesSelect.find(':selected').val();
  var regions = this.regionsData['countries'][countryVal];
  if (!($regionsSelect.attr('data-country') === countryVal)) {
    $regionsSelect.attr('data-country', countryVal);
    $regionsSelect.empty();
    var sortedData = this.sortData(regions);
    for (var i = 0; i < sortedData.length; i++) {
      var val = sortedData[i];
      var content = regions[val];
      var $option = jQuery("<option></option>");
      $option.val(val);
      $option.text(content);
      $regionsSelect.append($option);
    }
  }
}

CustomRegionUpdater.prototype.cityUpdate = function() {
  var $citiesSelect = jQuery(this.cityId);
  var $regionsSelect = jQuery(this.regionId);
  var regionVal = $regionsSelect.find(':selected').val();
  if (!(typeof this.regionsData['cities'] === 'undefined')) {
    var cities = this.regionsData['cities'][regionVal];
    if (!($citiesSelect.attr('data-region') === regionVal)) {
      $citiesSelect.attr('data-region', regionVal);
      $citiesSelect.empty();
      var sortedData = this.sortData(cities);
      for (var i = 0; i < sortedData.length; i++) {
        var val = sortedData[i];
        var content = cities[val];
        var $option = jQuery("<option></option>");
        $option.val(val);
        $option.text(content);
        $citiesSelect.append($option);
      }
    }
  }
}

CustomRegionUpdater.prototype.sortData = function(data) {
  var keys = [];
  for (var j in data) {
      if (data.hasOwnProperty(j)) {
          keys.push(j);
      }
  }
  var sortedData = keys.sort();
  return sortedData;
}


CustomRegionUpdater.prototype.rebuildSelect = function($select) {
  $select.unuselect();
  $select.trigger('change');
}
