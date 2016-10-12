import urlService from '../urlService';

describe('urlService', () => {
	it('updatePreUrl', () => {
		urlService.updatePreUrl('/login');
		expect(urlService.getPreUrl()).toBe('/login');
	});
});