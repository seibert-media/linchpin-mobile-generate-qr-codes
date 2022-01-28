import QRCode from 'qrcode';
import axios from "axios";
import path from 'path';

// Usernames, you want to generate qrcodes for:
let usernames = ['pwinter', 'tschroeder'];

// your confluence-url
let serverUrl = 'https://mobile-test.linchpin-intranet.com';

// your admin authentication
let adminname = "";
let adminpassword = "";

async function createToken (username) {
	let response = await axios.put(
			serverUrl + '/rest/linchpin-mobile/1.0/firescope/user/qrcode',
			{"userName": username, "expiry": 1, "qrcodetype": 1},
			{
				auth: {
					username: adminname,
					password: adminpassword
				},
			}
	);
	return response.data;
}

usernames.forEach(async username => {
	let token = await createToken(username);

	let savepath = path.resolve('qrcodes', username + '.png');

	await QRCode.toFile(savepath, JSON.stringify(token));
	console.log("code for " + username + " saved to qrcodes dir");
});


