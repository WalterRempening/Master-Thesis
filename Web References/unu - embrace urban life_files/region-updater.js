var RegionUpdater = Class.create(RegionUpdater, {

    /**
     * if country key is empty string do nothing
     *
     * @param $super {Callable}
     */
    update: function($super)
    {
        if (this.countryEl.value != "") {
            $super();
        }
    }
});