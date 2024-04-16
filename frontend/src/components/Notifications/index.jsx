import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.css';

const createNotification = (type, title, text) => {
	new Notify ({
			status: type,
			title,
			text,
			effect: 'slide',
			speed: 300,
			customClass: '',
			customIcon: '',
			showIcon: true,
			showCloseButton: true,
			autoclose: true,
			autotimeout: 3000,
			notificationsGap: null,
			notificationsPadding: null,
			type: 'outline',
			position: 'right top',
			customWrapper: '',
		});
};

export { createNotification }