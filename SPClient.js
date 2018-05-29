
function getUserProfileProperties(userName) {

    if(!username)
        return;

    //create sharepoint user account (sp syntax)
    var userAccountName = encodeURIComponent("i:0#.f|membership|"+username);

    //ajax call
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" +userAccountName+"'",
        async: false,   //async or not async flag
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            var userSpProfiles = data.d.UserProfileProperties;
            
            var SPAccountName = '';
            var SPJobtitle = '';
            var SPContactNumber = '';
            var SPWorkEmail = '';
            var SPUserEmail = '';
            var SPCellPhone = '';

            //get sample properties
            userSpProfiles.results.forEach(function (profileElement) {
                if (profileElement.Key == "UserName") SPUserEmail = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
                if (profileElement.Key == "AccountName") SPAccountName = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
                if (profileElement.Key == "WorkEmail") SPWorkEmail = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
                if (profileElement.Key == "WorkPhone") SPContactNumber = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
                if (profileElement.Key == "CellPhone") SPCellPhone = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
                if (profileElement.Key == "SPS-JobTitle") SPJobtitle = profileElement.Value == '' ? '' : profileElement.Value.toLowerCase();
            });
        },
        error: function (x, y, z) {
            alert(JSON.stringify(x) + '\n' + JSON.stringify(y) + '\n' + JSON.stringify(z));
        }
    })
};

//call function (user must be a sharepoint user)
getUserProfileProperties('vardhaman@tsunami684.onmicrosoft.com');