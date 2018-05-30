
myapp.factory('GetUserId', function ($http, $q) {
	return {
		GetUserIDDetails: function (userName) {
			var deferred = $q.defer();
			UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
			var accountName = userName;
			return $.ajax({
				method: 'GET',
				url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers(@v)?@v='" + encodeURIComponent(accountName) + "'",
				headers: { "Accept": "application/json;odata=verbose" }
			});
		}
	};
});