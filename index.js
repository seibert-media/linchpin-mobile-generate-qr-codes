import QRCode from 'qrcode';
import axios from "axios";
import path from 'path';
import * as fs from 'fs';

// Usernames, you want to generate qrcodes for:
let usernames = ['pwinter', 'tschroeder'];

// your confluence-url
let serverUrl = 'https://demonstration.linchpin-intranet.com';

// your admin authentication
let adminname = "";
let adminpassword = "";

// how long is the qrcode valid (hours)
const qrcodeValidFor = 24;

// timeout after each request in ms
const TIMEOUT_MS=100;

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function createToken (username) {
	let response = await axios.put(
			serverUrl + '/rest/linchpin-mobile/1.0/firescope/user/qrcode',
			{"userName": username, "expiry": 1, "qrcodetype": qrcodeValidFor},
			{
				auth: {
					username: adminname,
					password: adminpassword
				},
			}
	);
	return response.data;
}

function checkTargetFolder () {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync('qrcodes')) {
			console.log("not exists");
			fs.mkdir("qrcodes", {}, (error) => {
				if (!error) {
					resolve();
				} else {
					reject();
				}
			});
		} else {
			resolve();
		}
	})
}


async function run () {
	await checkTargetFolder();

	for (let username of usernames) {
		let token;
		await new Promise(r => setTimeout(r, TIMEOUT_MS));
		console.log("---------------------");
		console.log("working on user 👤", username);
		try {
			token = await createToken(username);
			console.log("✓ Succeeded to get a token from server for user 👤", username);
		} catch (e) {
			if (e.response && e.response.status) {
				console.error("error getting token, server return status ", e.response.status, e.response.statusText);
			} else {
				console.error("✗ could not get token from server", e.message);
			}

		}
		if (token) {
			let savepath = path.resolve('qrcodes', username + '.png');
			await QRCode.toFile(savepath, JSON.stringify(token));
			console.log("✓ code for " + username + " saved to qrcodes dir " + savepath);
		}
	}
}

try {
	 (async () => {
		await run()
	})();
} catch (error) {
	console.log("error", error);
}
