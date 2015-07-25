(function () {
    define(["Ajax"], function (Ajax) {
        function BaseModel () {
            this.userStats = {
                user:'',
                timeToComplete: '',
                difficultyComplete: '',
                level: ''
            };
        }
        
        BaseModel.prototype = {
            constructor: BaseModel,
            setData: function (data) {
                console.log("Returning data from base", this);
                return data;
            },
            getState: function (state) {
                console.log('State:', state);
                return state;
            }
        };
        return BaseModel;
    });
}());
