import userStore from '../stores/userStore';

class auth {
	static checkLogin() {
		if (!userStore.isLogin()) {
			// this.context.router.push('/');
		}
	}
}