define([
    'marionette',
    'configurator/views/Marker'
],  function (Marionette, MarkerView) {
        return Marionette.CollectionView.extend({
            tagName: "div",
            className: 'product__markers',
            itemView: MarkerView
        });
    }
);