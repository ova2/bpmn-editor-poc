export class Utils {
	static indent(len: number, template: string): string {
		let retString: string = "";
		for (var i: number = 0; i < len; i++) {
			retString = retString.concat(template);
		}
		return retString;
	}


	static makePrintableString(s: string): string {
		let retString: string = s;
		let map = {  // Special characters
			'\\': '\\', '\n': 'n', '\r': 'r', '\t': 't'
		};
		retString = retString.replace(/[\\\n\r\t]/g, function (i) {
			return '\\' + map[i];
		});
		retString = retString.replace(/[^ -~]/g, function (i) {
			return '\\u' + ("000" + i.charCodeAt(0).toString(16)).slice(-4);
		});
		return retString;
	}

}
