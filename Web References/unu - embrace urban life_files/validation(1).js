Validation.add('validate-select','Please select an option.', function(sValue, $Element){
    if ($Element.refreshSelectBoxIt) {
        $Element.refreshSelectBoxIt();
    }
    if (Validation.get('IsEmpty').test(sValue)) {
        return false;
    }
    return true;
});