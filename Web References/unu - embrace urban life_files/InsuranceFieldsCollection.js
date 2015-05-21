define([
    'marionette',
    'insurance/views/InsuranceField'
],  function (Marionette, InsuranceFieldView) {
        return Marionette.CollectionView.extend({
            tagName: "div",
            className: 'insurance-form',
            itemView: InsuranceFieldView
        });
    }
);