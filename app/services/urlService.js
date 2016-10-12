class urlService {
	static updatePreUrl(url) {
		this.preUrl = url;
	}

	static getPreUrl() {
		if (!this.preUrl) {
			return '/';
		}

		return this.preUrl;
	}
}

export default urlService;